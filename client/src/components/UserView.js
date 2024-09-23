import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import dayjs from 'dayjs';

function UserView({ blogPosts }) {

	const [postList, setPostList] = useState([]);
	const [username, setUsername] = useState("");
	const [formattedDate, setFormattedDate] = useState("");

	useEffect(() => {

		const postsArr = blogPosts.map(blogPost => {

			getUsername(blogPost.userId);
			let newDate = dayjs(blogPost.creationDate);
			setFormattedDate(newDate.format("MMM D, YYYY"));

			return (
				<Link key={blogPost._id} to={`/posts/${blogPost._id}`} style={{ textDecoration: 'none'}}>
					<Card style={{ cursor: 'pointer' }}>
						<Card.Body>
							<Card.Title>{blogPost.title}</Card.Title>
							<Card.Subtitle>{blogPost.userId} | {blogPost.creationDate}</Card.Subtitle>
						</Card.Body>
					</Card>
				</Link>
			)
		})

		setPostList(postsArr);

	}, [blogPosts])

	function getUsername(userId) {
		fetch(`${process.env.REACT_APP_API_URL}/users/details/${userId}`)
		.then(res => res.json())
		.then(data => {
			if (data !== undefined) {
				console.log(username)
				setUsername(data.username);
			} else {
				setUsername("");
			}
		})
	}

	return (
		<>
		{postList}
		</>
	)
}

export default UserView;