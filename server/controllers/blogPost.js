const BlogPost = require("../models/BlogPost");
const { errorHandler } = require("../auth");

// Create Post
module.exports.createBlogPost = async (req, res) => {

	try {

		let newBlogPost = await new BlogPost({
			userId: req.user.id,
			title: req.body.title,
			content: req.body.content
		});

		await newBlogPost.save();
		res.status(201).json(newBlogPost);

	} catch(error) {errorHandler(error, req, res)}

}

// Get All Posts
module.exports.getAllPosts = async (req, res) => {

	try {

		const allPosts = await BlogPost.find({});
		if (allPosts.length === 0) {
			res.status(404).json({message: "No posts found"});
		}

		res.status(200).json({posts: allPosts});

	} catch(error) {errorHandler(error, req, res)}

}

// Get User's Posts
module.exports.getUserPosts = async (req, res) => {

	try {

		const userPosts = await BlogPost.find({userId: req.user.id});
		if (userPosts.length === 0) {
			res.status(404).json({message: "No posts found"});
		}

		res.status(200).json({posts: userPosts});

	} catch(error) {errorHandler(error, req, res)}

}

// Get Single Post
module.exports.getPost = async (req, res) => {

	try {

		const blogPost = await BlogPost.findById(req.params.id);
		if (blogPost === null) {
			res.status(404).json({message: "Post not found"});
		}

		res.status(200).json(blogPost);

	} catch(error) {errorHandler(error, req, res)}

}

// Update Post
module.exports.updateBlogPost = async (req, res) => {

	try {

		const blogPost = await BlogPost.findById(req.params.id);
		if (blogPost === null) {
			res.status(404).json({message: "Post not found"});
		}

		if (req.user.id === blogPost.userId) {
			const updatedPost = await BlogPost.findByIdAndUpdate(req.params.id, req.body, {new: true});
			
			res.status(200).json({
				message: "Post updated successfully",
				updatedPost: updatedPost
			});
		} else {
			res.status(403).json({error: "Action Forbidden"});
		}


	} catch(error) {errorHandler(error, req, res)}

}

// Delete Post
module.exports.deleteBlogPost = async (req, res) => {

	try {

		const blogPost = await BlogPost.findById(req.params.id);
		if (blogPost === null) {
			res.status(404).json({message: "Post not found"});
		}

		if (req.user.isAdmin || req.user.id === blogPost.userId) {
			const deletedPost = await BlogPost.deleteOne({_id: req.params.id});
			if (deletedPost < 1) {
				res.status(400).json({error: "No post deleted"});
			}

			res.status(200).json({message: "Post deleted successfully"});
		} else {
			res.status(403).json({error: "Action Forbidden"});
		}

		

	} catch(error) {errorHandler(error, req, res)}

}