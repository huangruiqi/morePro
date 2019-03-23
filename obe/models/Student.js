// 学生
const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    "name": String,
    "number": String,
    "academic": String,
    "major": String,
    "class": String,
    "password": String,

});
module.exports = Student = mongoose.model('Student', studentSchema)