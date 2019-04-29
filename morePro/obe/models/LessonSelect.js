// 选课关系
const mongoose = require('mongoose')

const lessonSelectSchema = new mongoose.Schema({
    // 学生姓名
    "name": String,
    // 学生学号
    "number": String,
    // 班级代号
    "classNumber": String,
    // 班级名称
    "className": String,
    // 课程编号
    "lessonNumber": String,
    // 课程名称
    "lessonName": String,
    // 课程ID
    "lessonId": String,
    // 创建者ID
    "teacherId": String,
    // 创建者名称
    "teacherName": String,
    // 批改状态
    "status": String,
    // 提交状态
    "submitStatus": String,
    // 分数
    "grade": String
})
module.exports = LessonSelect = mongoose.model('LessonSelect', lessonSelectSchema)