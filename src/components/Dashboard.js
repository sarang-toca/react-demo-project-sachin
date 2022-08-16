import React from "react";
 import PropTypes from "prop-types";
 import { connect } from "react-redux";
import Read from "./Read";

const Dashboard = ({ auth: { user } }) => {
 
	return (
		
	<>
	{/* <h1>{user.name}</h1>
	<h1>{user.profileImg}</h1> */}
		<Read/>
	</>
		
		
		   
	)
};
Dashboard.propTypes = {
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps)(Dashboard);

