import React, { useState } from 'react';
import Alert from '../../layout/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { addLeaveType } from '../../../actions/adminLeaveAction';
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import store from '../../../store';
import { remove } from '../../../actions/alert';

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '90%',
    height: '100%',
    marginLeft: 'auto',
    marginTop: '2%',
    marginRight: 'auto',
    background: '#fff',
    [theme.breakpoints.down('xs')]: {
      marginTop: '20%',
    },
  },
  btn: {
    background: '#0EA900',
    '&:hover': {
      backgroundColor: '#0EA900',
    },
  },
}));

const AddLeaveType = ({ alerts }) => {
  const dispatch = useDispatch();
  const alert = useSelector((state) => state.alert);
  const classes = useStyles();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      leaveType: '',
      numberLeave: '',
    },
    validationSchema: Yup.object({
      leaveType: Yup.string().required('LeaveType is required'),
      numberLeave: Yup.string().required('Number is required'),
    }),
    onSubmit: (values) => {
      let leaveType = values.leaveType;
      let numberLeave = values.numberLeave;
      dispatch(addLeaveType({ leaveType, numberLeave }));
    },
  });
  if (alert[0]?.msg == 'successfully created') {
    store.dispatch(remove(alert[0]?.msg, alert[0]?.alertType, alert[0]?.id));
    navigate('/updateleavetype');
  }

  return (
    <>
      <div className={classes.mainContainer}>
        <h3 style={{ marginTop: '5px' }} className="title">
          ADD LEAVE TYPE
        </h3>{' '}
        <div
          style={{
            width: '100%',
            borderRadius: '0px',
            background: '#F5F5F5',
            marginTop: '0.5%',
            boxShadow: '5.29353px 0px 13.2338px rgba(0, 0, 0, 0.2)',
          }}
        >
          <Grid
            style={{ width: '90%', marginLeft: 'auto', marginRight: 'auto' }}
          >
            <br />
            <form onSubmit={formik.handleSubmit}>
              <div>
                <label htmlFor="">Leave Type</label>
                <input
                  type="text"
                  placeholder="Add Leave Type"
                  name="leaveType"
                  className={
                    formik.touched.leaveType && formik.errors.leaveType
                      ? 'inputstyleTwo'
                      : 'inputstyle'
                  }
                  onChange={formik.handleChange}
                  value={formik.values.leaveType}
                />
              </div>
              {formik.touched.leaveType && formik.errors.leaveType ? (
                <div style={{ color: 'red' }}>{formik.errors.leaveType}</div>
              ) : null}
              <br />
              <div>
                <label htmlFor="">Max Number Of Leave Allowed</label>
                <input
                  type="number"
                  placeholder="Enter Max Number Of Leave Allowed"
                  name="numberLeave"
                  className={
                    formik.touched.numberLeave && formik.errors.numberLeave
                      ? 'inputstyleTwo'
                      : 'inputstyle'
                  }
                  onChange={formik.handleChange}
                  value={formik.values.numberLeave}
                />
                {formik.touched.numberLeave && formik.errors.numberLeave ? (
                  <div style={{ color: 'red' }}>
                    {formik.errors.numberLeave}
                  </div>
                ) : null}
              </div>
              <br />
              <Alert />

              <Button
                variant="contained"
                className={classes.btn}
                color="secondary"
                type="submit"
                disabled={alert.length > 0 ? true : false}
              >
                Submit
              </Button>
            </form>
          </Grid>
          <br />
        </div>
      </div>
    </>
  );
};

AddLeaveType.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  AddLeaveType: state.alert,
});

export default connect(mapStateToProps)(AddLeaveType);
