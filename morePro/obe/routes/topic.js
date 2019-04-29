let express = require('express');
let router = express.Router();
var url = require("url");
let Topic = require("../models/Topic.js");

/* GET topics listing. */
router.get('/', function (req, res, next) {
  var { topicID } = url.parse(req.url, true).query; // 若传了请求的id，则只传单条数据
  
  if (topicID) {
    Topic.findById(topicID).exec(function (err, topics) {
      res.json(topics)
    })
  } else { 
    Topic.find({}).exec(function(err, topics){
      res.json(topics)
    })
  }
});

router.post('/add', function (req, res, next) {
  var body = req.body;
  Topic.find({}).exec(function (err, topics) {
    if (err) throw err;
    var obj = body;
    Topic.create(obj, function (err) {
      if (err) {
        res.json({ result: 0 });
      } else {
        res.json({ result: 1 });
      }
    })
  })
});

// 帖子的评论
router.post('/reply', function (req, res, next) {
  let body = req.body;
  let topicID = body.topicID;
  let discussObj = body;
  Topic.findById(topicID).exec(function (err, topics) {
    if (!err) { 
      let id = 1001,
        discuss = [];
      discussObj.id = id;
      if (topics) { // 有评论数据时直接将新的评论插入到第一位置
        discuss = topics.discuss;
        if (discuss && discuss.length != 0) {
          id = discuss.reduce(function (pre, nev) { // 设置默认的id值
            return pre.id > nev.id ? pre : nev;
          }).id + 1
        }
        discussObj.id = id;
        discuss.unshift(discussObj);
        topics.markModified("discuss"); // 更改数据后需要调用该方法才能保存
        topics.save();
        res.json({result:1});
      } else { // 无评论数据时
        obj = {
          "topicID": fields.topicID,
          "discuss": [discussObj]
        }
        Topic.create(obj, function (err) {
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

// 帖子的删除
router.post('/topicDel', function(req, res, next) {
  let fields = req.body;
  
  Topic.findOne({ _id: fields.topicID }).exec(function (err, topics) {
    if (!err) { 
      if (topics) { // 有评论数据时直接将新的评论插入到第一位置
        topics.remove();
        topics.save();
        res.json({result:1});
      } else { // 无评论数据时
        res.json({result:0});
      }
    }
  })
});

// 帖子评论的删除
router.post('/discussDel', function(req, res, next) {
  let fields = req.body;
  
  Topic.findOne({ _id: fields.topicID }).exec(function (err, comments) {
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
module.exports = router;
