const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Routes
const userRoutes = require("./routes/user");
const blogPostRoutes = require("./routes/blogPost");
const commentRoutes = require("./routes/comment");

require("dotenv").config();

const app = express();

mongoose.connect(process.env.MONGODB_STRING);
mongoose.connection.once("open", () => console.log("Now connected to MongoDB Atlas"));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const corsOptions = {
    origin: ['http://localhost:3000', 'https://blog-app-client-q4nr06kr5-jaydarms-projects.vercel.app'],
    credentials: true,
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

app.use("/users", userRoutes);
app.use("/posts", blogPostRoutes);
app.use("/comments", commentRoutes);

if (require.main === module) {
	app.listen(process.env.PORT || 3000, () => {
		console.log(`API is now online on port ${process.env.PORT || 3000}`)
	});
}

module.exports = {app, mongoose};