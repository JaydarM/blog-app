const bcrypt = require("bcrypt");
const User = require("../models/User");
const auth = require("../auth");
const { errorHandler } = require("../auth");

// Register a User
module.exports.registerUser = async (req, res) => {

	try {

		let newUser = await new User({
			email: req.body.email,
			username: req.body.username,
			password: bcrypt.hashSync(req.body.password, 10)
		});
		if (!newUser.email.includes("@") || typeof newUser.email !== "string") {
			res.status(200).json({message: "Email is invalid"});
		} 
		if (typeof newUser.username !== "string") {
			res.status(200).json({message: "Username is invalid"});
		} 
		if (newUser.password.length < 8) {
			res.status(200).json({message: "Password must be atleast 8 characters long"});
		} 

		await newUser.save();
		res.status(201).json({message: "Registered Successfully"});

	} catch(error) {errorHandler(error, req, res)}

}

// Authenticate User
module.exports.loginUser = async (req, res) => {

	try {

		if (req.body.email == "") {
			res.status(400).json({message: "No email found"});
		}

		if (!req.body.email.includes("@")) {
			res.status(400).json({message: "Invalid email format"});
		}

		const userEmail = await User.findOne({email: req.body.email});
		if (userEmail === null) {
			res.status(404).json({message: "Incorrect email or password"});
		}

		const isPasswordCorrect = await bcrypt.compareSync(req.body.password, userEmail.password);
		if (isPasswordCorrect === false) {
			res.status(404).json({message: "Incorrect email or password"});
		} else {
			res.status(200).json({
				access: auth.createAccessToken(userEmail)
			});
		}

	} catch(error) {errorHandler(error, req, res)}

}

// Get User Details
module.exports.getUserDetails = async (req, res) => {

	try {

		const user = await User.findOne({_id: req.params.id}, {_id: 0, password: 0, isAdmin: 0});
		if (user === null) {
			res.status(404).json({message: "User not found"});
		}

		res.status(200).json(user);

	} catch(error) {errorHandler(error, req, res)}

}