var mongoose = require("mongoose");
var commentSchema = new mongoose.Schema({
	"taskID" : String,
	"discuss": Array
});
module.exports = commentSchema = mongoose.model("Comment",commentSchema);