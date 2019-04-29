var mongoose = require("mongoose");
var PersonTaskSchema = new mongoose.Schema({
	"taskId": String,
	"number": String,
    "name": String,
    // "lessonName": String,
    "classId": String,
    "status": {
    	type: String,
    	default: '未交'
    },
    "submitStatus": {
    	type: String,
    	default: '未交'
    },
    "workUrl": {
    	type: Array,
    	default: []
    },
    "comment": {
    	type: String,
    	default: ""
    },
    "grade": {
    	type: String,
    	default: "-"
    }
});
module.exports = PersonTask = mongoose.model("PersonTask", PersonTaskSchema);