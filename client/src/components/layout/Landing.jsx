import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@mui/material/Button';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { useNavigate } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 0,
    color: '#fff !important',
    alignItems: 'left',
  },
  paper: {
    padding: '30px !important',
    textAlign: 'center',
    color: '#fff !important',
    background: 'linear-gradient(90deg, #2B5876 0%, #4E4376 100%)',
    height: '100vh',
    left: '0px',
    top: '0px',
  },
  papertwo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100vh',
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      display: 'none',
    },
  },
  btn: {
    backgroundColor: '#00DFC0 !important',
    color: '#fff !important',
    borderRadius: '10px 10px 0px 0px !important',
    width: '238px',
    height: '60px',
    padding: '10px',
    paddingLeft: '50px !important',
    [theme.breakpoints.down('md')]: {
      width: '200px',
      height: '40px',
      padding: '10px',
      paddingLeft: '30px !important',
    },
  },
  fontsizeh1: {
    fontSize: '32px',
    [theme.breakpoints.down('md')]: {
      fontSize: '22px',
    },
    [theme.breakpoints.down('sm')]: {
      fontSize: '14px',
    },
  },
  img: {
    [theme.breakpoints.down('sm')]: {
      width: '340px',
      height: '340px',
    },
  },
}));

const Landing = ({ isAuthenticated }) => {
  const classes = useStyles();
  let navigate = useNavigate();

  if (isAuthenticated) {
    return <Navigate to="/myprofile" />;
  }

  return (
    <>
      <div className={classes.root}>
        <Grid container>
          <Grid item xs={12} lg={3} md={4} sm={5}>
            <Paper className={classes.paper}>
              <br />
              <br />
              <h1>Logo Here</h1>
              <br />
              <br />

              <Button
                className={classes.btn}
                startIcon={<PermIdentityIcon />}
                onClick={() => navigate('login')}
                style={{ justifyContent: 'flex-start' }}
              >
                Employee Login
              </Button>
              <br />
              <br />

              <Button
                className={classes.btn}
                startIcon={<PermIdentityIcon />}
                onClick={() => navigate('login')}
                style={{ justifyContent: 'flex-start' }}
              >
                Admin Login
              </Button>
            </Paper>
          </Grid>
          <Grid item lg={9} md={8} sm={7} xs={0}>
            <Paper className={classes.papertwo}>
              <h1 className={classes.fontsizeh1}>
                Welcome To Leave Management System
              </h1>
              <img
                className={classes.img}
                src="https://i.pinimg.com/564x/cb/dc/9b/cbdc9bf758a327b81d8c8a937f95fcf4.jpg"
                alt=""
                width="408px"
                height="408px"
              />
            </Paper>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
