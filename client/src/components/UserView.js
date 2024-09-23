import { useState, useEffect } from "react";

import PostCard from "./PostCard";

function UserView({ blogPosts }) {

	const [postList, setPostList] = useState([]);

	useEffect(() => {

		const postsArr = blogPosts.map(blogPost => {

			return (
				<PostCard key={blogPost._id} blogPost={blogPost} />
			)
		})

		setPostList(postsArr);

	}, [blogPosts])

	return (
		<>
		{postList}
		</>
	)
}

export default UserView;