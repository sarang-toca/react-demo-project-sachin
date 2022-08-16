import React, { Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logOut } from "../../actions/authActions";
// import { DropdownButton } from "react-bootstrap";
//  import { MenuItem } from "@mui/material";
 import Container from 'react-bootstrap/Container';
 import Nav from 'react-bootstrap/Nav';
 import Navbar from 'react-bootstrap/Navbar';
 import NavDropdown from 'react-bootstrap/NavDropdown';

const Navbars = ({ auth: { isLoggedIn, loading, user }, logOut }) => {
	const authLinks = (
	
		<Navbar collapseOnSelect expand="lg" bg="dark">
		<Container>
		  <Navbar.Brand href="#home">React</Navbar.Brand>
		  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
		  <Navbar.Collapse id="responsive-navbar-nav">
			<Nav className="navbar-nav ms-auto">
			  <Nav.Link href="/dashboard" className="text-white">Dashboard</Nav.Link>
			  {/* <Nav.Link href="#pricing">Pricing</Nav.Link> */}
			  <NavDropdown title="Dropdown" className="text-white" id="collasible-nav-dropdown">
				<NavDropdown.Item>{user.name}</NavDropdown.Item>
				<NavDropdown.Item href={"/profile"}>
				  Edit Profile
				</NavDropdown.Item>
				<NavDropdown.Divider />
				<NavDropdown.Item href="/login" onClick={logOut}>
				  Logout
				</NavDropdown.Item>
			  </NavDropdown>
			</Nav>
		  </Navbar.Collapse>
		</Container>
		
	  </Navbar>
		
		
	);
	const guestLinks = (
		<Navbar collapseOnSelect expand="lg" bg="dark " variant="dark">
		 <Container>
		  <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
		  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
		  <Navbar.Collapse id="responsive-navbar-nav">
			<Nav className="me-auto">
			  <Nav.Link href="/register">Register</Nav.Link>
			  <Nav.Link href="/login">Login</Nav.Link>
			 
			</Nav>
		  </Navbar.Collapse>
		</Container> 
		
	  </Navbar>

		// <ul className="nav-links">
		// 	<li>
		// 		<Link to="/register">Register</Link>
		// 	</li>
		// 	<li>
		// 		<Link to="/login">Login</Link>
		// 	</li>
		// </ul>
	);

	return (
		<Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
		{/* <Container>
		  <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
		  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
		  <Navbar.Collapse id="responsive-navbar-nav">
			<Nav className="me-auto">
			  <Nav.Link href="#features">Features</Nav.Link>
			  <Nav.Link href="#pricing">Pricing</Nav.Link>
			  <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
				<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
				<NavDropdown.Item href="#action/3.2">
				  Another action
				</NavDropdown.Item>
				<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
				<NavDropdown.Divider />
				<NavDropdown.Item href="#action/3.4">
				  Separated link
				</NavDropdown.Item>
			  </NavDropdown>
			</Nav>
			<Nav>
			  <Nav.Link href="#deets">More deets</Nav.Link>
			  <Nav.Link eventKey={2} href="#memes">
				Dank memes
			  </Nav.Link>
			</Nav>
		  </Navbar.Collapse>
		</Container> */}
		{!loading && (
				<Fragment>{isLoggedIn ? authLinks : guestLinks}</Fragment>
			)}
	  </Navbar>
	);
};

Navbars.propTypes = {
	logOut: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { logOut })(Navbars);