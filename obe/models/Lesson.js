// 课程
const mongoose = require('mongoose')
const lessonSchema = new mongoose.Schema({
    "number": String,
    "title": String,
    "description": String,
    "url": String,
    "teacher": String,
    // 班级去掉，自动关联
    // "class": String,
    "time": Number,
    "score": Number,
    // 任务去掉
    // "task": Array,
    // 培养方案
    "trainingUrl": String,
    // 课程大纲
    "teachingUrl": String,
})

module.exports = User = mongoose.model('Lesson', lessonSchema)