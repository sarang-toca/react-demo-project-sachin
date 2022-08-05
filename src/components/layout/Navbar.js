import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logOut } from "../../actions/authActions";
import { DropdownButton } from "react-bootstrap";
 import { MenuItem } from "@mui/material";

const Navbar = ({ auth: { isLoggedIn, loading, user }, logOut }) => {
	const authLinks = (
		<ul className="nav-links">
			 <li className="btn btn-secondary">
				<Link to="/dashboard">
					<i className="fas fa-user"></i>
					<span className="hide-sm">Dashboard</span>
				</Link>
			</li> 
			
			{/* <DropdownButton title="Profile">
				<Link onClick={logOut} to="/login" replace>
					<i className="fas fa-sign-out-alt">Profile</i>{" "}
					<span className="hide-sm"> &nbsp;Logout</span>
					
				</Link>
				</DropdownButton> */}
			
			 <DropdownButton style = {{color:"white",width:"300px", display:"inline-block"}}  title="Profile">
    
	  <MenuItem href="#books">Welcome,{user.name}</MenuItem>

       <Link to={"/updateUser/" + user.id} style={{ textDecoration: 'none' }}><MenuItem href="#podcasts">Create Profile</MenuItem></Link>

	   <Link to={"/editUser/" + user.id} style={{ textDecoration: 'none' }}><MenuItem href="#podcasts">Edit Profile</MenuItem></Link>

	   
	  {/* <MenuItem linkButton={true}  component={Link} to={"/updateUser/" + user.id} title="Edit Profile"  hasBullet={true} >
				Edit User
	 </MenuItem> */}
	
	  {/* <Link type="button" to={'/details/' + user.id} className="btn btn-warning">Details</Link> */}
      <MenuItem href="#addBlog" onClick={logOut} to="/login"> Logout</MenuItem>
	
    </DropdownButton>
	
		</ul>
		
		
	);
	const guestLinks = (
		<ul className="nav-links">
			<li>
				<Link to="/register">Register</Link>
			</li>
			<li>
				<Link to="/login">Login</Link>
			</li>
		</ul>
	);

	return (
		<nav className="navbar bg-">
			<h2>
				<Link to="/">HOME</Link>
			</h2>
			{!loading && (
				<Fragment>{isLoggedIn ? authLinks : guestLinks}</Fragment>
			)}
		</nav>
	);
};

Navbar.propTypes = {
	logOut: PropTypes.func.isRequired,
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps, { logOut })(Navbar);