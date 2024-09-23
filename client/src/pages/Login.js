import { Notyf } from "notyf";
import "notyf/notyf.min.css";

import { useState, useEffect, useContext } from "react";
import UserContext from "../context/UserContext";
import { Navigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";

function Login() {

	const notyf = new Notyf();

	const { user, setUser } = useContext(UserContext);

	// Hooks
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	// Login Button Enabled
	const [isActive, setIsActive] = useState(false);

	useEffect(() => {
		if (email !== "" && password !== "") {
			setIsActive(true);
		} else {
			setIsActive(false);
		}
	}, [email, password])

	function authenticate(e) {
		e.preventDefault();

		fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			}, 
			body: JSON.stringify({
				email: email,
				password: password
			})
		})
		.then(res => res.json())
		.then(data => {
			if (data.access !== undefined) {
				localStorage.setItem("token", data.access);

				const info = getUserDetails(data.access);
				console.log(info);
				setUser({
					id: info.id,
					isAdmin: info.isAdmin
				});

				setEmail("");
				setPassword("");

				notyf.success("Logged In Successfully");
			} else {
				notyf.error("Incorrect credentials. Try again.");
			}
		})
	}

	function getUserDetails(token) {
		const decodedToken = jwtDecode(token);
		return decodedToken;
	}

	return (
		(user.id != null) ?
		<Navigate to="/posts" />
		:
		<Form onSubmit={(e) => authenticate (e)}>
    		<h1 className="my-5 text-center">Login</h1>
	      	<Form.Group className="mb-3" controlId="formGroupEmail">
		        <Form.Label>Email Address</Form.Label>
		        <Form.Control 
			        type="email" 
			        placeholder="Enter email" 
			        required
		        	value={email} 
		        	onChange={e => {setEmail(e.target.value)}}
		        />
	      	</Form.Group>
	      	<Form.Group className="mb-3" controlId="formGroupPassword">
		        <Form.Label>Password</Form.Label>
		        <Form.Control 
			        type="password" 
			        placeholder="Enter password" 
			        required
		        	value={password} 
		        	onChange={e => {setPassword(e.target.value)}}
		        />
	      	</Form.Group>
	      	{isActive ?
            	<Button variant="primary" type="submit" id="submitLoginBtn">Login</Button>
            	:
            	<Button variant="danger" type="submit" id="submitLoginBtn" disabled>Login</Button>
        	}
	    </Form>
	)
}

export default Login;