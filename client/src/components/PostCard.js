import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import dayjs from 'dayjs';

function PostCard({ blogPost }) {

	const [username, setUsername] = useState("");
	const [formattedDate, setFormattedDate] = useState("");

	useEffect(() => {
		getUsername();
		formatDate();
	}, [])

	function getUsername() {
		fetch(`${process.env.REACT_APP_API_URL}/users/details/${blogPost.userId}`)
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
		let newDate = dayjs(blogPost.creationDate);
		setFormattedDate(newDate.format("MMM D, YYYY"));
	}

	return (
		<Link to={`/posts/${blogPost._id}`} style={{ textDecoration: 'none'}}>
			<Card className="my-3" style={{ cursor: 'pointer' }}>
				<Card.Body>
					<Card.Title>{blogPost.title}</Card.Title>
					<Card.Subtitle>{username} | {formattedDate}</Card.Subtitle>
				</Card.Body>
			</Card>
		</Link>
	)
}

export default PostCard;