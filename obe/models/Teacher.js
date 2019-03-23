// 教师
const mongoose = require('mongoose')

const teacherSchema = new mongoose.Schema({
    "name": String,
    "number": String,
    "academic": String,
    "password": String,

});
module.exports = Teacher = mongoose.model('Teacher', teacherSchema)