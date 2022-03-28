import React from 'react';
import { makeStyles } from '@material-ui/core';
import Container from '@material-ui/core/Container';
const useStyles = makeStyles({
  root: {
    height: '87vh',
    width: '100%',
    borderRadius: '0px',
    background: '#F5F5F5',
    marginTop: '0.5%',
  },
});
function Profile() {
  const classes = useStyles();

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: '90%',
        marginLeft: 'auto',
        marginTop: '2%',
        marginRight: 'auto',
        background: '#fff',
      }}
    >
      <h3 style={{ marginTop: '5px' }}>My Profile</h3>
      <Container className={classes.root} maxWidth={false}></Container>
    </div>
  );
}

export default Profile;
