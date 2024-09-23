const express = require("express");
const blogPostController = require("../controllers/blogPost");
const { verify, verifyAdmin } = require("../auth");

const router = express.Router();

// Route to Create Blog Post
router.post("/create-post", verify, blogPostController.createBlogPost);

// Route to get all Posts
router.get("/all-posts", blogPostController.getAllPosts);

// Route to get single post
router.get("/get-post/:id", blogPostController.getPost);

// Route to get User Posts
router.get("/all-posts/user", verify, blogPostController.getUserPosts);

// Route to Update Post
router.patch("/update-post/:id", verify, blogPostController.updateBlogPost);

// Route to Delete Post
router.delete("/delete-post/:id", verify, blogPostController.deleteBlogPost);

module.exports = router;