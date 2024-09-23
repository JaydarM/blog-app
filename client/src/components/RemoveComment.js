import { Notyf } from "notyf";
import "notyf/notyf.min.css";

import { useState, useContext } from "react";
import UserContext from "../context/UserContext";
import { Button, Modal } from "react-bootstrap";

function RemoveComment({ commentId, fetchComments }) {

	const notyf = new Notyf();

	const { user } = useContext(UserContext);

	const [showDelete, setShowDelete] = useState(false);

	function openDelete() {
		setShowDelete(true);
	}

	function closeDelete() {
		setShowDelete(false);
	}

	function deleteComment(e, commentId) {
		e.preventDefault();

		fetch(`${process.env.REACT_APP_API_URL}/comments/remove-comment/${commentId}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("token")}`
			}
		})
		.then(res => res.json())
		.then(data => {
			if (data.message === "Comment removed successfully") {
				notyf.success("Removed Comment");
				closeDelete();
				fetchComments();
			} else {
				notyf.error("Something went wrong");
				closeDelete();
			}
		})
	}

	return (
		(user.isAdmin) ?
			<>
			<Button variant="danger" size="sm" onClick={() => openDelete()}> Remove </Button>
	
			<Modal  show={showDelete} onHide={closeDelete}>
				<Modal.Header closeButton>
			        <Modal.Title id="contained-modal-title-vcenter">Remove Comment</Modal.Title>
		      	</Modal.Header>
		      	<Modal.Body>
		        	<p>Are you sure you want to remove this comment?</p>
		      	</Modal.Body>
		      	<Modal.Footer>
		        	<Button variant="secondary" onClick={closeDelete}>Close</Button>
		        	<Button variant="danger" onClick={e => deleteComment(e, commentId)}>Remove</Button>
		      	</Modal.Footer>
			</Modal>
			</>
			:
			<></>
	)
}

export default RemoveComment;