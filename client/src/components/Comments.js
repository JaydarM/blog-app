import { useState, useEffect, useContext } from 'react';
import UserContext from "../context/UserContext";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

import AddComment from "./AddComment";
import RemoveComment from "./RemoveComment";

function Comments({ blogPostId }) {

	const { user } = useContext(UserContext);

	const [comments, setComments] = useState([]);
	const [hasComments, setHasComments] = useState(false);
	const [commentList, setCommentList] = useState([]);

	useEffect(() => {
		getAllComments();

		const commentsArr = comments.map(comment => {
			return (
				<Card key={comment._id}>
					<Card.Header>User: {comment.userId}</Card.Header>
					<Card.Body>
						<p>{comment.comment}</p>
						<RemoveComment commentId={comment._id} fetchComments={getAllComments} />
					</Card.Body>
					<Card.Footer>{comment.creationDate}</Card.Footer>
				</Card>
			)
		})
		setCommentList(commentsArr);

	}, [hasComments])

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
		{(user.id == null) ?
			<Link className="btn btn-outline-primary" role="button" to="/login">Login to Add Comment</Link>
			:
			<AddComment blogPostId={blogPostId} fetchComments={getAllComments} />}
		{(hasComments) ?
			<>
			{commentList}
			</>
			:
			<h5>No Comments</h5>}
		</>
	)
}

export default Comments;