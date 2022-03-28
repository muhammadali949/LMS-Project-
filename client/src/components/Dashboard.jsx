import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TestTwo from './TestTwo';

const Dashboard = ({ auth: { user } }) => {
  return (
    <>
      {/* <div style={{ marginTop: '6rem', textAlign: 'center' }}> */}
      {/* <h1>Welcome, {user && user.name}</h1> */}
      {/* </div> */}
      <br />
      <br />
      <br />
      <br />
      <TestTwo />
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
