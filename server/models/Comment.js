const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
	userId: {
		type: String,
		required: [true, "UserId is Required"]
	},
	blogPostId: {
		type: String,
		required: [true, "Blog Post ID is Required"]
	},
	comment: {
		type: String,
		required: [true, "Comment is Required"]
	},
	creationDate: {
		type: Date,
		default: Date.now
	}
})

module.exports = mongoose.model("Comment", commentSchema);