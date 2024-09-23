import { Notyf } from 'notyf';
import 'notyf/notyf.min.css';

import { useState, useEffect, useContext } from 'react';
import UserContext from "../context/UserContext";
import { useParams } from 'react-router-dom';
import dayjs from 'dayjs';
import { Link } from "react-router-dom";

import EditPost from "../components/EditPost";
import DeletePost from "../components/DeletePost";
import Comments from "../components/Comments";

function BlogPostDetails() {

	const notyf = new Notyf();

	const { user } = useContext(UserContext);

	const { blogPostId } = useParams();

	// Hooks
	const [blogPost, setBlogPost] = useState(null);
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");
	const [userId, setUserId] = useState("");
	const [username, setUsername] = useState("");
	const [formattedDate, setFormattedDate] = useState("");

	useEffect(() => {
		fetchBlogPostDetails();
	}, [blogPostId])

	function fetchBlogPostDetails() {
		fetch(`${process.env.REACT_APP_API_URL}/posts/get-post/${blogPostId}`)
		.then(res => res.json())
		.then(data => {
			if (data !== undefined) {
				setBlogPost(data);
				setTitle(data.title);
				setContent(data.content);
				setUserId(data.userId);

				getUsername(data.userId);

				let newDate = dayjs(data.creationDate);
				setFormattedDate(newDate.format("MMMM D, YYYY h:mm A"));
			} else {
				notyf.error("Something went wrong");
			}
		})
	}

	function getUsername(userId) {
		fetch(`${process.env.REACT_APP_API_URL}/users/details/${userId}`)
		.then(res => res.json())
		.then(data => {
			if (data !== undefined) {
				setUsername(data.username);
			} else {
				notyf.error("Something went wrong");
			}
		})
	}

	// Drill down blogPostId to Comment Component
	return (
		<>
		<div className="my-3 d-flex flex-row">
			<div className="flex-fill">
				<Link className="btn btn-dark" role="button" to="/posts">Back</Link>
			</div>
			{(user.id === userId) ?
			<>
			<div className="mx-3">
				<EditPost blogPost={blogPost} fetchData={fetchBlogPostDetails} />
			</div>
			<div>
				<DeletePost blogPostId={blogPostId} />
			</div>
			</>
			:
			<></>}
			{(user.isAdmin) ?
			<div>
				<DeletePost blogPostId={blogPostId} />
			</div>
			:
			<></>}
		</div>
		<div className="my-3">
			<h1>{title}</h1>
			<h5>By {username} | {formattedDate}</h5>
			<hr className="hr" />
			<p>{content}</p>
		</div>
		<div className="my-5">
			<h3>Comments</h3>
			<Comments blogPostId={blogPostId} />
		</div>
		</>
	)
}

export default BlogPostDetails;