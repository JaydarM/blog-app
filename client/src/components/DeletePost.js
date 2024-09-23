import { Notyf } from "notyf";
import "notyf/notyf.min.css";

import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function DeletePost({ blogPostId }) {

	const notyf = new Notyf();
	const navigate = useNavigate();

	const [showDelete, setShowDelete] = useState(false);

	function openDelete() {
		setShowDelete(true);
	}

	function closeDelete() {
		setShowDelete(false);
	}

	function deleteBlogPost(e, blogPostId) {
		e.preventDefault();

		fetch(`${process.env.REACT_APP_API_URL}/posts/delete-post/${blogPostId}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("token")}`
			}
		})
		.then(res => res.json())
		.then(data => {
			if (data.message === "Post deleted successfully") {
				notyf.success("Deleted Post");
				closeDelete();
				navigate("/posts");
			} else {
				notyf.error("Something went wrong");
				closeDelete();
			}
		})
	}

	return (
		<>
		<Button variant="danger" onClick={() => openDelete()}> Delete </Button>

		<Modal  show={showDelete} onHide={closeDelete}>
			<Modal.Header closeButton>
		        <Modal.Title id="contained-modal-title-vcenter">Delete Post</Modal.Title>
	      	</Modal.Header>
	      	<Modal.Body>
	        	<p>Are you sure you want to delete this post?</p>
	      	</Modal.Body>
	      	<Modal.Footer>
	        	<Button variant="secondary" onClick={closeDelete}>Close</Button>
	        	<Button variant="danger" onClick={e => deleteBlogPost(e, blogPostId)}>Delete</Button>
	      	</Modal.Footer>
		</Modal>
		</>
	)
}

export default DeletePost;