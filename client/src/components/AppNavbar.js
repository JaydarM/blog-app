import { useContext } from "react";
import UserContext from "../context/UserContext";
import { Container, Navbar, Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";

function AppNavbar() {

	const { user } = useContext(UserContext);

	// Profile is temp, may or may not be needed
	return (
		<Navbar bg="dark" data-bs-theme="dark">
	        <Container>
	         	<Navbar.Brand>BLOG</Navbar.Brand>
	          	<Nav className="me-auto">
	          		<Nav.Link as={NavLink} to="/posts" exact="true">Posts</Nav.Link>
	          		{(user.id !== null) ?
	          			<>
	          			<Nav.Link as={NavLink} to="/logout" exact="true">Logout</Nav.Link>
	          			</>
	          			:
	          			<>
	          			<Nav.Link as={NavLink} to="/register" exact="true">Register</Nav.Link>
	          			<Nav.Link as={NavLink} to="/login" exact="true">Login</Nav.Link>
	          			</>
	          		}
	          	</Nav>
	        </Container>
	    </Navbar>
	)
}

export default AppNavbar;