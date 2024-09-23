import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import dayjs from 'dayjs';

import RemoveComment from "./RemoveComment";

function CommentCard({ comment, getAllComments }) {

	const [username, setUsername] = useState("");
	const [formattedDate, setFormattedDate] = useState("");

	useEffect(() => {
		getUsername();
		formatDate();
	}, [])

	function getUsername() {
		fetch(`${process.env.REACT_APP_API_URL}/users/details/${comment.userId}`)
		.then(res => res.json())
		.then(data => {
			if (data !== undefined) {
				setUsername(data.username);
			} else {
				setUsername("");
			}
		})
	}

	function formatDate() {
		let newDate = dayjs(comment.creationDate);
		setFormattedDate(newDate.format("MMMM D, YYYY h:mm A"));
	}

	return (
		<Card className="mb-3">
			<Card.Header>User: {username}</Card.Header>
			<Card.Body>
				<p>{comment.comment}</p>
			</Card.Body>
			<Card.Footer className="d-flex flex-row">
				<div className="flex-fill">{formattedDate}</div>
				<div>
					<RemoveComment commentId={comment._id} fetchComments={getAllComments} />
				</div>
			</Card.Footer>
		</Card>
	)
}

export default CommentCard;