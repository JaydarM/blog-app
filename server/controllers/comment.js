const Comment = require("../models/Comment");
const { errorHandler } = require("../auth");

// Create Comment
module.exports.addComment = async (req, res) => {

	try {

		let newComment = await new Comment({
			userId: req.user.id,
			blogPostId: req.params.id,
			comment: req.body.comment
		});

		await newComment.save()
		res.status(201).json(newComment);

	} catch(error) {errorHandler(error, req, res)}

}

// Get All Comments
module.exports.getAllComments = async (req, res) => {

	try {

		const allComments = await Comment.find({});
		if (allComments.length === 0) {
			res.status(404).json({message: "No comments found"});
		} else {
			res.status(200).json({comments: allComments});
		}

	} catch(error) {errorHandler(error, req, res)}

}

// Remove Comments - Admin
module.exports.removeComment = async (req, res) => {

	try {

		const removedComment = await Comment.deleteOne({_id: req.params.id});
		if (removedComment < 1) {
			res.status(400).json({error: "No comment removed"});
		}

		res.status(200).json({message: "Comment removed successfully"});

	} catch(error) {errorHandler(error, req, res)}

}

// Get All Comments for Post
module.exports.allPostComments = async (req, res) => {

	try {

		const allCommentsForPost = await Comment.find({blogPostId: req.params.blogPostId});
		if (allCommentsForPost.length === 0) {
			res.status(404).json({message: "No comments found"});
		} else {
			res.status(200).json({comments: allCommentsForPost});
		}

	} catch(error) {errorHandler(error, req, res)}

}