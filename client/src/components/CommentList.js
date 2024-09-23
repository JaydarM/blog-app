import { useState, useEffect } from "react";

import CommentCard from "./CommentCard";

function CommentList({ comments, getAllComments }) {

	const [commentList, setCommentList] = useState([]);

	useEffect(() => {
		const commentsArr = comments.map(comment => {
			return (
				<CommentCard key={comment._id} comment={comment} getAllComments={getAllComments} />
			)
		})
		setCommentList(commentsArr);
	}, [comments])

	return (
		<>
		{commentList}
		</>
	)
}

export default CommentList;