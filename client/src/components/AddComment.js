import { Notyf } from "notyf";
import "notyf/notyf.min.css";

import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

function AddComment({ blogPostId, fetchComments }) {

	const notyf = new Notyf();

	const [comment, setComment] = useState("");

	const [showAdd, setShowAdd] = useState(false);

	function openAdd() {
		setShowAdd(true);
	}

	function closeAdd() {
		setShowAdd(false);
		setComment("");
	}

	function addNewComment(e) {
		e.preventDefault();

		fetch(`${process.env.REACT_APP_API_URL}/comments/add-comment/${blogPostId}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("token")}`
			},
			body: JSON.stringify({
				comment: comment
			})
		})
		.then(res => res.json())
		.then(data => {
			if (data !== undefined) {
				notyf.success("Comment Added!");

				setComment("");

				closeAdd();
				fetchComments();
			} else {
				notyf.error("Something went wrong");
				closeAdd();
			}
		})
	}

	return (
		<>
		<Button className="my-3" variant="success" onClick={() => openAdd()}> Add Comment </Button>

		<Modal show={showAdd} onHide={closeAdd}>
            <Form onSubmit={e => addNewComment(e)}>
                <Modal.Header closeButton>
                    <Modal.Title>Add Comment</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form.Group>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={comment} 
                            onChange={e => setComment(e.target.value)} 
                            as="textarea"
                            rows={5}
                            required/>
                    </Form.Group>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={closeAdd}>Close</Button>
                    <Button variant="success" type="submit">Submit</Button>
                </Modal.Footer>
            </Form>
        </Modal>
		</>
	)
}

export default AddComment;