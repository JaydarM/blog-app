import { useState, useEffect, useContext } from 'react';
import UserContext from "../context/UserContext";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

import AddComment from "./AddComment";
import CommentList from "./CommentList";

function Comments({ blogPostId }) {

	const { user } = useContext(UserContext);

	const [comments, setComments] = useState([]);
	const [hasComments, setHasComments] = useState(false);

	useEffect(() => {
		getAllComments();
	}, [])

	function getAllComments() {
		fetch(`${process.env.REACT_APP_API_URL}/comments/all-comments/${blogPostId}`)
		.then(res => res.json())
		.then(data => {
			if (data.message === "No comments found") {
				setHasComments(false);
			} else {
				setHasComments(true);
				setComments(data.comments);
			}
		})
	}

	return (
		<>
		<div className="d-grid">
		{(user.id == null) ?
			<Link className="btn btn-outline-primary" role="button" to="/login">Login to Add Comment</Link>
			:
			<AddComment blogPostId={blogPostId} fetchComments={getAllComments} />}
		</div>
		{(hasComments) ?
			<>
			<CommentList comments={comments} getAllComments={getAllComments} />
			</>
			:
			<h5>No Comments</h5>}
		</>
	)
}

export default Comments;