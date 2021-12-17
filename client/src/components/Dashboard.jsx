import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Test from "./Test";

const Dashboard = ({ auth: { user } }) => {
	return (
        <>		
        <div style={{ marginTop: "6rem", textAlign: "center" }}>
			<h1>Welcome, {user && user._id}</h1>
			<Test/>
		</div>
        </>

	);
};
Dashboard.propTypes = {
	auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
	auth: state.auth,
});

export default connect(mapStateToProps)(Dashboard);