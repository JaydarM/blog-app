const express = require("express");
const userController = require("../controllers/user");

const router = express.Router();

// Route for registration
router.post("/register", userController.registerUser);

// Route for login
router.post("/login", userController.loginUser);

// Route to get User Details
router.get("/details/:id", userController.getUserDetails);

module.exports = router;