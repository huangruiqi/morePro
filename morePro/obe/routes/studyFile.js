var express = require('express');
var router = express.Router();
const formidable = require('formidable')
var StudyFile = require("../models/StudyFile.js");
var fs = require("fs");
var url = require("url");

/* GET users listing. */
router.get('/', function (req, res, next) {
  var { taskID } = url.parse(req.url, true).query; // 若传了请求的id，则只传单条数据
  var obj = {
    "taskID": taskID
  };
  StudyFile.findOne(obj).exec(function (err, studyFiles) {
    if (studyFiles) {
      res.json(studyFiles.files)
    }
  })
});

router.post('/upload', function (req, res, next) {
  var form = new formidable.IncomingForm();
  form.maxFileSize = 20 * 1024 * 1024; // 设置20兆的限制
  var uploadDir = "./fe/public/taskFile/";
  form.uploadDir = uploadDir;
  form.keepExtensions = true;
  form.parse(req, function (err, fields, files) {
    if (err) throw err;
    files = files.file;
    //拿到扩展名
    // var extname = path.extname(files.name);
    //旧的路径
    var oldpath = files.path;
    //新的路径
    var newpath = uploadDir + files.name;

    fs.rename(oldpath, newpath, function (err) {
      if (err) throw err;
      StudyFile.findOne({ taskID: fields.taskID }, function (err, studyFiles) {
        if (err) throw err;
        var uid = -1,
          arr = [],
          obj = {};
        if (studyFiles) {
          arr = studyFiles.files || [];
          if (arr.length != 0) {
            uid = arr.reduce(function (pre, nev) { // 设置默认的uid值
              return pre.uid < nev.uid ? pre : nev;
            }).uid - 1
          }
          arr.unshift({
            "uid": uid,
            "url": '/taskFile/' + files.name,
            "name": files.name,
            "status": 'done',
          });
          studyFiles.markModified("files");
          studyFiles.save();
        } else {
          obj = {
            "taskID": fields.taskID,
            "files": [{
              "uid": uid,
              "url": '/taskFile/' + files.name,
              "name": files.name,
              "status": 'done'
            }]
          }
          StudyFile.create(obj, function (err) {
            if (err) {
              res.json({ result: 0 });
            } else {
              res.json({ result: 1 });
            }
          })
        }
      });
    });
  })
});

router.post('/onDelete', function (req, res, next) { 
  res.json({ result: 1 });
});
module.exports = router;
