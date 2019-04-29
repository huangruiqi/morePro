var express = require('express');
var router = express.Router();
var fs = require('fs');
var multer  = require('multer');
var xlsx = require('node-xlsx').default;
var bodyParser = require('body-parser');
var PersonTask = require("../models/PersonTask.js");
var Grade = require("../models/Grade.js");
var LessonSelect = require('../models/LessonSelect.js');


var jsonParser = bodyParser.json();


// 根据班级ID获取班级同学的成绩
router.post('/getGradeList', jsonParser, function(req, res, next) {
    const { classId } = req.body;
    Grade.find({classId: classId}, function(err, result) {
    	res.json(result);
    }) 
});

// 获取某个同学的总成绩
router.post('/getOneGrade', jsonParser, function(req, res, next) {
	const { classId, number } = req.body;
	Grade.findOne({classId: classId, number: number}, function(err, result) {
    	res.json(result);
    }) 
});

// 获取班级同学信息列表
/*router.post('/getStudents', jsonParser, function(req, res, next) {
	const { classId } = req.body;
	let students = [];
	let obj = {};
	LessonSelect.find({classNumber: classId}, function(err, data) {
		data.map((item, i) => {
			obj = {
				number: item.number,
				name: item.name,
				classId: classId
			};
			students.push(obj);
		});
		Grade.create(students, (err) => {
			res.json({result: 1});
		});
	});
});*/

// 导出班级总成绩
router.post('/exportGrade', jsonParser, function(req, res, next) {
	// const data = [[1, 2, 3],[4, 5, 6], [7, 8, 9]];
	const { data, taskLen } = req.body;
	console.log(taskLen);
	const title = ['学号', '姓名', '总进度', '总成绩'];
	let taskTitle = [];
	for (let i = 1; i <= taskLen; i++) {
		taskTitle.push('任务'+i);
	}
	const array = title.concat(taskTitle);
	let tableData = [array];
	data.map((item, i) => {
		let itemData = [];
		itemData[0] = item.number;
		itemData[1] = item.name;
		itemData[2] = item.progress;
		itemData[3] = item.totalScore;
		for (let j = 1; j <= taskLen; j++) {
			itemData[3+j] = item['task'+j];
		}
		tableData.push(itemData);
	});
	var buffer = xlsx.build([{name: "学生成绩表", data: tableData}]); // Returns a buffer
	fs.writeFileSync('grade.xlsx', buffer, {'flag':'w'});
	res.json({result: 1});
})

module.exports = router;
