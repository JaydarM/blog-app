import { Notyf } from "notyf";
import "notyf/notyf.min.css";

import { useState, useContext } from "react";
import UserContext from "../context/UserContext"
import { Button, Modal, Form } from "react-bootstrap";

function CreatePost({ fetchBlogPosts }) {

	const notyf = new Notyf();

	const { user } = useContext(UserContext);

	// Hooks
	const [title, setTitle] = useState("");
	const [content, setContent] = useState("");

	// Show Create Post Modal
	const [showCreate, setShowCreate] = useState(false);

	function openCreate() {
		setShowCreate(true);
	}

	function closeCreate() {
		setShowCreate(false);
		setTitle("");
		setContent("");
	}

	function createNewPost(e) {
		e.preventDefault();

		fetch(`${process.env.REACT_APP_API_URL}/posts/create-post`, {
			method: "POST",
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
			if (data !== undefined) {
				notyf.success("Post Created!");

				setTitle("");
				setContent("");

				closeCreate();
				fetchBlogPosts();
			} else {
				notyf.error("Something went wrong");
				closeCreate();
			}
		})
	}

	return(
		<>
		<Button className="my-3" variant="success" onClick={() => openCreate()}> Create Post </Button>

		<Modal show={showCreate} onHide={closeCreate}>
            <Form onSubmit={e => createNewPost(e)}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Post</Modal.Title>
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
                    <Button variant="secondary" onClick={closeCreate}>Close</Button>
                    <Button variant="success" type="submit">Submit</Button>
                </Modal.Footer>
            </Form>
        </Modal>
		</>
	)
}

export default CreatePost;