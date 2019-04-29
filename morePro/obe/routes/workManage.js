const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Task = require("../models/Task.js");
const LessonSelect = require('../models/LessonSelect.js');
const Grade = require('../models/Grade.js');
const PersonTask = require('../models/PersonTask.js');

const jsonParser = bodyParser.json();

// 根据课程ID获取任务列表
router.post('/getTaskList', jsonParser, function(req, res, next) {
	const { classId } = req.body;
	// Task.find({classId: classId}, (err, tasks) => {
	// 	res.json(tasks);
	// });
	Task.find({}, (err, tasks) => {
		res.json(tasks);
	});
});

// 根据任务ID获取该任务信息
router.post('/getOneTask', jsonParser, function(req, res, next) {
	const { taskId } = req.body;
	console.log(taskId);
	Task.findOne({_id: taskId}, (err, tasks) => {
		res.json(tasks);
	});
});

// 修改任务占比
router.post('/changePercent', jsonParser, function(req, res, next) {
	const { percentList, classId }= req.body;
	Task.find({classId: classId}, (err, tasks) => {
		if (err) {
			res.json({result: 0});
		} else {
			percentList.forEach(function(item, i) {
				tasks[i].percent = item;
				tasks[i].markModified("percent");
				tasks[i].save();
			});	
			res.json({result: 1});
		}
	});
});

// 任务新增、修改、删除
router.post('/', jsonParser, function(req, res, next) {
	let id = null,
	    obj = req.body;
	    console.log(req.body);
	    classId = obj.classId;
	if (obj.type === 'add') {
		LessonSelect.find({classNumber: classId}, (err, result) => {
			obj.submitStatus = {
				"type1": 0,
				"type2": 0,
				"type3": result.length
			};
			obj.percent = 0;
			Task.create(obj, (err) => {
			    if(err) {
			        res.json({result:0});
			    } else {
			    	Task.find({classId: classId}, (err, tasks) => {
			    		let taskId = tasks[tasks.length-1]._id+'';
			    		let dataArr = [];
			    		Grade.find({classId: classId}, (err, students) => {
			    			students.map((item, i) => {
			    				let obj = {
			    					name: item.name,
			    					number: item.number,
			    					classId: classId,
			    					taskId: taskId
			    				}
			    				dataArr.push(obj);
			    			});
			    			PersonTask.insertMany(dataArr, function(err) {});
			    		})
			    		res.json({result:1});
			    	});
			    }
			});
		})
		
	} else if (obj.type === 'query') {
		id = obj.id
		Task.find({_id: id}, (err, tasks) => {
		  res.json(tasks);
		});
	} else if (obj.type === 'update') {
		id = obj.id
		delete(obj.type);
		delete(obj.id);
		Task.update({_id: id}, obj, (err) => {
			if(err) {
		        res.json({result:0});
		    } else {
		        res.json({result:1});
		    }
		});
	} else if (obj.type === 'delete') {
		id = obj.id;
		Task.remove({_id: id}, (err) => {
			if(err) {
	        res.json({result:0});
	    } else {
	        res.json({result:1});
	    }
		});
	}
	
});


module.exports = router;