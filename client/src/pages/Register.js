import { Notyf } from "notyf";
import "notyf/notyf.min.css";

import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Register() {

	const notyf = new Notyf();
	const navigate = useNavigate();

	// Hooks
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	// Register Button Enabled
	const [isActive, setIsActive] = useState(false);

	useEffect(() => {
		if ((email !== "" && username !== "" && password !== "" && confirmPassword !== "") && (password === confirmPassword)) {
			setIsActive(true);
		} else {
			setIsActive(false);
		}
	}, [email, password, confirmPassword])

	function registerUser(e) {
		e.preventDefault();

		fetch(`${process.env.REACT_APP_API_URL}/users/register`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				email: email,
				username: username,
				password: password
			})
		})
		.then(res => res.json())
		.then(data => {
			if (data.message === "Registered Successfully") {
				setEmail("");
				setPassword("");
				setConfirmPassword("");

				notyf.success("Registered Successfully");
				navigate("/login");
			} else {
				notyf.error("Something went wrong");
			}
		})
	}

	return (
		<Form onSubmit={(e) => registerUser(e)}>
			<h1 className="my-5 text-center">Register</h1>
			<Form.Group>
                <Form.Label>Email:</Form.Label>
                <Form.Control 
                    type="email" 
                    placeholder="Enter Email" 
                    required 
                    value={email}
                    onChange={e => {setEmail(e.target.value)}}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Username:</Form.Label>
                <Form.Control 
                    type="text" 
                    placeholder="Enter Username" 
                    required 
                    value={username}
                    onChange={e => {setUsername(e.target.value)}}
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Password:</Form.Label>
                <Form.Control 
                    type="password" 
                    placeholder="Enter Password" 
                    required 
                    value={password}
                    onChange={e => {setPassword(e.target.value)}}
                />
            </Form.Group>
            <Form.Group className="mb-3">
                <Form.Label>Confirm Password:</Form.Label>
                <Form.Control 
                    type="password" 
                    placeholder="Confirm Password" 
                    required 
                    value={confirmPassword}
                    onChange={e => {setConfirmPassword(e.target.value)}}
                />
            </Form.Group>
            {isActive ?
            	<Button variant="primary" type="submit" id="submitBtn">Submit</Button>
            	:
            	<Button variant="danger" type="submit" id="submitBtn" disabled>Submit</Button>
        	}
		</Form>
	)
}

export default Register;