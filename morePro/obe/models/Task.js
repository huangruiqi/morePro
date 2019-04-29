var mongoose = require("mongoose");
var taskSchema = new mongoose.Schema({
	"title": String,
	"description": String,
	"percent": Number,
	"startTime": String,
	"endTime": String,
	"classId": String,
	"submitStatus": Object
});
module.exports = Task = mongoose.model("Task",taskSchema);