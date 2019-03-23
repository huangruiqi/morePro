var mongoose = require("mongoose");
var gradeSchema = new mongoose.Schema({
	"number": String,
    "name": String,
    "gradeArray": {
    	type: Array,
    	default: []
    },
    "progress": {
    	type: String,
    	default: '0%'
    },
    "totalScore": {
    	type: Number,
    	default: 0
    },
    "classId": String
});
module.exports = Grade = mongoose.model("Grade",gradeSchema);