var express = require('express');
var router = express.Router();
var Comment = require("../models/Comment.js");
var url = require("url");

/* GET users listing. */
router.get('/', function (req, res, next) {
  var { taskID } = url.parse(req.url, true).query; // 若传了请求的id，则只传单条数据
  var obj = {
    "taskID": taskID
  };
  Comment.findOne(obj).exec(function (err, comments) {
    if (comments) { 
      res.json(comments.discuss)
    }
  })
});

// 删除
router.post('/discussDel', function(req, res, next) {
  let fields = req.body;
  
  Comment.findOne({ taskID: fields.taskID }).exec(function (err, comments) {
    if (!err) { 
      let discuss = [];
      let result = 0;
      if (comments) { // 有评论数据时直接将新的评论插入到第一位置
        discuss = comments.discuss;
        if (discuss instanceof Array) {
          discuss.forEach(function (item, index) {
            if (item.id === fields.id) {
              discuss.splice(index, 1);
              comments.markModified("discuss"); // 更改数据后需要调用该方法才能保存
              comments.save();
              result = 1;
              return;
            }
          });
        }
        res.json({result:result});
      } else { // 无评论数据时
        res.json({result:result});
      }
    }
  })
});

router.post('/', function(req, res, next) {
  let fields = req.body;
  let discussObj = fields;
  
  Comment.findOne({ taskID: fields.taskID }).exec(function (err, comments) {
    if (!err) { 
      let id = 1001,
        discuss = [];
      discussObj.id = id;
      if (comments) { // 有评论数据时直接将新的评论插入到第一位置
        discuss = comments.discuss;
        if (discuss && discuss.length != 0) {
          id = discuss.reduce(function (pre, nev) { // 设置默认的id值
            return pre.id > nev.id ? pre : nev;
          }).id + 1
        }
        discussObj.id = id;
        discuss.unshift(discussObj);
        comments.markModified("discuss"); // 更改数据后需要调用该方法才能保存
        comments.save();
        res.json({result:1});
      } else { // 无评论数据时
        obj = {
          "taskID": fields.taskID,
          "discuss": [discussObj]
        }
        Comment.create(obj, function (err) {
          if(err){
            res.json({result:0});
          }else{
            res.json({result:1});
          }
        })
      }
    }
  })
});

module.exports = router;
