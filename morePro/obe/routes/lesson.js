const express = require('express')
const router = express.Router()
const formidable = require('formidable')
const Lesson = require('../models/Lesson.js')
const LessonSelect = require('../models/LessonSelect.js')
const Classes = require('../models/Classes.js')
const url = require('url')
const fs = require('fs')

// 添加课程 - Done
router.post('/add', function(req, res, next) {
    Lesson.create(req.body, function(err){
        if (err) {
        res.json({
            status: 0,
            data: '添加课程失败'
        })
        } else {
        res.json({
            status: 1,
            data: '添加课程成功'
        })
        }
    })
});

// 上传课程缩略图 - Done
router.post('/add/picUpload', function(req, res, next) {

    let form = new formidable.IncomingForm()
    form.parse(req, function(err, fields, files) {
        const obj = files.file
        // 获得文件的临时路径
        var tmp_path = obj.path
        // 指定文件上传后的目录。
        var target_path = './public/lessonPic/' + obj.name
        // 移动文件
        fs.rename(tmp_path, target_path, function(err) {
            if (err) throw err
            // 删除临时文件夹文件
            fs.unlink(tmp_path, function() {
                if (err) throw err
                res.send({
                    status: 1,
                    data: {
                        url: '/lessonPic/' + obj.name
                    }
                })
            });
        })
    })
});

// 编辑课程 - Done
router.post('/edit', function(req, res, next) {
    Lesson.update({ _id: req.body._id }, req.body, { multi : true }, function(err, raw) {
        if (err) {
            res.json({
                status: 0,
                data: '更新课程失败'
            })
        } else {
            res.json({
                status: 1,
                data: '更新课程成功'
            })
        }
    })
});

// 删除课程 - Done
router.post('/delete', function(req, res, next) {
    Lesson.remove({ _id: req.body.id }, function(err, raw) {
        if (err) {
            res.json({
                status: 0,
                data: '删除课程失败'
            })
        } else {
            res.json({
                status: 1,
                data: '删除课程成功'
            })
        }
    })
});

// 选择课程 - To Do
router.get('/select', function(req, res, next) {
    res.send('选择课程')
});

// 教师教授课程 or 学生已选课程 - To Do
router.post('/seleted', function(req, res, next) {
    const { type , number, teacherId } = req.body

    const conf = {
        student: {
            params: { number },
            model: LessonSelect,
        },
        teacher: {
            params: { teacherId },
            model: Classes,
        },
    }

    conf[type].model.find(conf[type].params, function(err, docs) {
        if (err) {
            res.send({
                status: 0,
            })
        } else {
            res.send({
                status: 1,
                data: docs || []
            })
        }
    })
});

// 获取单个课程信息 - Done
router.get('/:id', function(req, res, next) {
    Lesson.find({ _id: req.params.id }, function(err, docs) {
        if (err) {
            res.send({
                status: 0,
            })
        } else {
            res.send({
                status: 1,
                data: docs[0] || {}
            })
        }
    })
});

// 获取课程列表信息 - Done
router.get('/', function(req, res, next) {
    Lesson.find({}, function(err, docs) {
        if (err) {
            res.send({
                status: 0
            })
        } else {
            res.send({
                status: 1,
                data: docs
            })
        }
    })
});

module.exports = router;