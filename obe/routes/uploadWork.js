var express = require('express');
var router = express.Router();
var fs = require('fs');
var multer  = require('multer');
var bodyParser = require('body-parser');
var PersonTask = require("../models/PersonTask.js");
const LessonSelect = require('../models/LessonSelect.js');
const Grade = require('../models/Grade.js');
const Task = require('../models/Task.js');

var jsonParser = bodyParser.json();

// 根据任务id查询作业
router.post('/getWorkList', jsonParser, function(req, res, next) {
    const {taskId, number, identity} = req.body;
    console.log(identity);
    PersonTask.findOne({taskId: taskId, number: number}, (err, result) => {
        if (!result) {
            //记录不存在则创建
            if (identity === 'student') {
                PersonTask.create({taskId: taskId, number: number}, (err, result) => {
                    res.json(result);
                });
            }
        } else {
            // 返回查找到的记录
            res.json(result);
        }
    });
});

// 删除作业
router.post('/deleteWork', jsonParser, function(req, res, next) {
    var uid = req.body.uid;
    var taskId = req.body.taskId;
    PersonTask.findOne({taskId: taskId}, (err, result) => {
        if(err) {
            res.json({result:0});
        } else {
            result.workUrl.forEach(function(item, i) {
                if(item.uid === uid) {
                    result.workUrl.splice(i, 1);
                    result.markModified("workUrl");
                    result.save();
                }
            })
            res.json({result:1});
        }
    });
});

// 作业打分
router.post('/marking', jsonParser, function(req, res, next) {
    var {taskId, taskIndex, classId, taskPercent, number, comment, grade} = req.body;
    console.log(req.body);
    PersonTask.update({taskId: taskId, number: number}, {grade: grade, comment: comment, status: '已批'}, (err) => {
        if (err) {
            res.json({result:0});
        } else {
            Grade.findOne({number: number, classId: classId}, (err, result) => {
                var progress = result.progress ? parseInt(result.progress) : 0;
                var totalScore = result.totalScore ? result.totalScore : 0;
                result.progress = progress+taskPercent+"%";
                result.totalScore = totalScore+taskPercent*grade/100;
                result.gradeArray[taskIndex] = grade;
                result.markModified("progress");
                result.markModified("totalScore");
                result.markModified("gradeArray");
                result.save();
            });
            Task.findOne({_id: taskId}, (err, task) => {
                task.submitStatus.type1 = task.submitStatus.type1 + 1;
                task.submitStatus.type2 = task.submitStatus.type2 - 1;
                task.markModified("submitStatus");
                task.save();
                res.json({result:1});
            });
        }
    });
});

// 查询一个任务下学生的完成情况
router.post('/getOneClass', jsonParser, function(req, res, next) {
    const { classId, taskId } = req.body;
    PersonTask.find({classId: classId, taskId: taskId}, function(err, students) {
        if (!err) {
            res.json({data: students})
        }
    })
});

// 使用硬盘存储模式设置存放接收到的文件的路径以及文件名
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // 接收到文件后输出的保存路径（若不存在则需要创建）
        cb(null, './fe/public/tasks/');    
    },
    filename: function (req, file, cb) {
        // 将保存文件名设置为 时间戳 + 文件原始名，比如 151342376785-123.jpg
        cb(null, Date.now() + "-" + file.originalname);  
    }
});

// 创建文件夹
var createFolder = function(folder){
    try{
        // 测试 path 指定的文件或目录的用户权限,我们用来检测文件是否存在
        // 如果文件路径不存在将会抛出错误"no such file or directory"
        fs.accessSync(folder); 
    }catch(e){
        // 文件夹不存在，以同步的方式创建文件目录。
        fs.mkdirSync(folder);
    }  
};

var uploadFolder = './fe/public/tasks/';
createFolder(uploadFolder);

// 创建 multer 对象
var upload = multer({ storage: storage });

/* POST upload listing. */
router.post('/', upload.single('file'), function(req, res, next) {
    var file = req.file;
    var {taskId, number, classId, endTime} = req.body;
    endTime = new Date(endTime).getTime();
    var uploadTime = new Date().getTime();
    var firstUpload = false;
    var uid, workItem;
    PersonTask.findOne({taskId: taskId, number: number}, (err, result) => {
        if (result.workUrl.length > 0) {
            uid=result.workUrl.reduce(function(pre,nev){ // 设置默认的id值
              return pre.uid<nev.uid?pre:nev;
            }).uid-1
        } else {
            uid = -1;
            firstUpload = true;
        }
        workItem = {
            "uid": uid,
            "name": file.originalname,
            "url": './tasks/' + file.filename
        };
        if (firstUpload) {
            console.log(123);
            Task.findOne({_id: taskId}, (err, task) => {
                task.submitStatus.type2 = task.submitStatus.type2 + 1;
                task.submitStatus.type3 = task.submitStatus.type3 - 1;
                task.markModified("submitStatus");
                task.save();
            });
            result.status = "已交";
            result.markModified("status");
            result.classId = classId;
            result.markModified("classId");
            if (uploadTime <= endTime) {
                result.submitStatus = '按时交';
            } else {
                result.submitStatus = '超时交';
            }
            result.markModified("submitStatus");
        }
        result.workUrl.push(workItem);
        result.markModified("workUrl");
        result.save();
        res.json({result: 1});
    }); 
});




module.exports = router;