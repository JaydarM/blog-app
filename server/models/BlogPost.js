const mongoose = require("mongoose");

const blogPostSchema = new mongoose.Schema({
	userId: {
		type: String,
		required: [true, "User ID is Required"]
	},
	title: {
		type: String,
		required: [true, "Title is Required"]
	},
	content: {
		type: String,
		required: [true, "Content is Required"]
	},
	creationDate: {
		type: Date,
		default: Date.now
	}
})

module.exports = mongoose.model("BlogPost", blogPostSchema);