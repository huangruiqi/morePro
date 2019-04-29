var mongoose = require("mongoose");
var topicSchema = new mongoose.Schema({
	"studyID": Number,
    "name": String,
	"title": String,
    "content": String,
	"createTime": {
		type: Date,
		default: Date.now
	},
	"discuss": {
		type: Array,
		default: []
	}
});
module.exports = User = mongoose.model("Topic",topicSchema);