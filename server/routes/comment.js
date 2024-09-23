const express = require("express");
const commentController = require("../controllers/comment");
const { verify, verifyAdmin } = require("../auth");

const router = express.Router();

// Route to Create Comments
router.post("/add-comment/:id", verify, commentController.addComment);

// Route to Get all Comments
router.get("/all-comments", commentController.getAllComments);

// Route to Remove Comments
router.delete("/remove-comment/:id", verify, verifyAdmin, commentController.removeComment);

// Route to Get Comments for Post
router.get("/all-comments/:blogPostId", commentController.allPostComments);

module.exports = router;