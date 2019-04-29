let express = require('express');
let router = express.Router();
let bodyParser = require('body-parser');
let Classes = require("../models/Classes.js");
let LessonSelect = require("../models/LessonSelect.js");

let jsonParser = bodyParser.json();

router.get('/', function(req, res, next) {

});


router.post('/getLessonList', jsonParser, function(req, res, next) {
	const type = req.body.type;
	if (type === 'teacher') {
		Classes.find({teacherId: req.body.teacherId}, (err, lessons) => {
			res.json(lessons);
		});
	} else {
		LessonSelect.find({number: req.body.studentId}, (err, lessons) => {
			res.json(lessons);
		});
	}	
});

router.post('/', jsonParser, function(req, res, next) {

	
});


module.exports = router;