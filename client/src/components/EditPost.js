import { Notyf } from "notyf";
import "notyf/notyf.min.css";

import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

function EditPost({ blogPost, fetchData }) {

	const notyf = new Notyf();

	const blogPostId = blogPost._id;
	const [title, setTitle] = useState(blogPost.title);
	const [content, setContent] = useState(blogPost.content);

	// State to Open and Close Modals
	const [showEdit, setShowEdit] = useState(false);

	function openEdit() {
		setShowEdit(true);
	}

	function closeEdit() {
		setShowEdit(false);
		setTitle("");
		setContent("");
	}

	function editBlogPost(e, blogPostId) {
		e.preventDefault();

		fetch(`${process.env.REACT_APP_API_URL}/posts/update-post/${blogPostId}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("token")}`
			},
			body: JSON.stringify({
				title: title,
				content: content
			})
		})
		.then(res => res.json())
		.then(data => {
			if (data.message === "Post updated successfully") {
				notyf.success("Post Updated");
				closeEdit();
				fetchData();
			} else {
				notyf.error("Something went wrong");
				closeEdit();
				fetchData();
			}
		})
	}

	return (
		<>
		<Button variant="info" onClick={() => openEdit()}> Edit </Button>

		<Modal show={showEdit} onHide={closeEdit}>
			<Form onSubmit={e => editBlogPost(e, blogPostId)}>
				<Modal.Header closeButton>
					<Modal.Title>Edit Post</Modal.Title>
				</Modal.Header>

				<Modal.Body>
                    <Form.Group>
                        <Form.Label>Title</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={title} 
                            onChange={e => setTitle(e.target.value)} 
                            required/>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Content</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={content} 
                            onChange={e => setContent(e.target.value)} 
                            as="textarea"
                            rows={5}
                            required/>
                    </Form.Group>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={closeEdit}>Close</Button>
                    <Button variant="success" type="submit">Submit</Button>
                </Modal.Footer>
			</Form>
		</Modal>
		</>
	)
}

export default EditPost;