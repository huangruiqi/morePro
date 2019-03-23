var mongoose = require("mongoose");
var studyFileSchema = new mongoose.Schema({
	"taskID" : String,
	"files": Array
});
module.exports = studyFile = mongoose.model("StudyFile",studyFileSchema);