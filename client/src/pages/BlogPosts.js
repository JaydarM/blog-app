import { useContext, useState, useEffect } from "react";
import UserContext from "../context/UserContext";
import { Link } from "react-router-dom";

import UserView from "../components/UserView"
import CreatePost from "../components/CreatePost";

// User View and Admin View
function BlogPosts() {
	
	const { user } = useContext(UserContext);

	// Hooks
	const [blogPosts, setBlogPosts] = useState([]);
	const [hasBlogPosts, setHasBlogPosts] = useState(false);

	useEffect(() => {
		fetchBlogPosts();
	}, [])

	function fetchBlogPosts() {
		fetch(`${process.env.REACT_APP_API_URL}/posts/all-posts`)
		.then(res => res.json())
		.then(data => {
			if (data && data.posts.length !== 0) {
				setHasBlogPosts(true);
				setBlogPosts(data.posts);
			} else {
				setHasBlogPosts(false);
			}
		})
	}

	return (
		<>
		{(user.id != null) ?
			<CreatePost fetchBlogPosts={fetchBlogPosts} />
			:
			<Link className="btn btn-outline-primary" role="button" to="/login">Login to Create Post</Link>}
		{(hasBlogPosts) ?
			<UserView blogPosts={blogPosts} />
			:
			<h1>No Posts Found</h1>}
		</>
	)
}

export default BlogPosts;