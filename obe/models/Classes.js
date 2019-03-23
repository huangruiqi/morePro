// 班级（需修改，以教学班为单位）
const mongoose = require('mongoose')

const classesSchema = new mongoose.Schema({
    // 班级名称
    "name": String,
    // 班级代号
    "number": String,
    // 关联的课程编号
    "lessonNumber": String,
    // 课程名称
    "lessonName": String,
    // 课程ID
    "lessonId": String,
    // 创建者ID
    "teacherId": String,
    // 创建者名称
    "teacherName": String,
    // 课程状态：1为【可学习】，0为【已下线】
    "status": {
        type: String,
        default: '1'
    }
});
module.exports = Classes = mongoose.model('Classes', classesSchema)