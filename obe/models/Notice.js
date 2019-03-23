// 班级公告
const mongoose = require('mongoose')

const noticeSchema = new mongoose.Schema({
    "title": String,
    "description": String,
    "createTime": String,
    "creatorId": String,
    "creatorName": String,
});
module.exports = Notice = mongoose.model('Notice', noticeSchema)