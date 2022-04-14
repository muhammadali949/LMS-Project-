import React, { useState } from 'react';
import Alert from '../../layout/Alert';
import { useDispatch, useSelector } from 'react-redux';
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
import { addDepartmentReq } from '../../../actions/department/departmentAction';

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
      name: '',
      shortName: '',
      code: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Name is required'),
      shortName: Yup.string().required('Short name is required'),
      code: Yup.string().required('Code is required'),
    }),
    onSubmit: (values) => {
      let name = values.name;
      let shortName = values.shortName;
      let code = values.shortName;
      dispatch(addDepartmentReq({ name, shortName, code }));
    },
  });
  if (alert[0]?.msg == 'successfully created') {
    store.dispatch(remove(alert[0]?.msg, alert[0]?.alertType, alert[0]?.id));
    navigate('/managedepartment');
  }

  return (
    <>
      <div className={classes.mainContainer}>
        <h3 style={{ marginTop: '5px' }}>Department</h3>
        <div
          style={{
            minHeight: '100%',
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
            <br />
            <form onSubmit={formik.handleSubmit}>
              <label htmlFor="">Name</label>
              <input
                type="text"
                placeholder="Name"
                name="name"
                className={
                  formik.touched.name && formik.errors.name
                    ? 'inputstyleTwo'
                    : 'inputstyle'
                }
                onChange={formik.handleChange}
                value={formik.values.name}
              />
              {formik.touched.name && formik.errors.name ? (
                <div style={{ color: 'red' }}>{formik.errors.name}</div>
              ) : null}
              <br />
              <br />
              <label htmlFor="">Short Name</label>
              <input
                type="text"
                placeholder="Short Name"
                name="shortName"
                className={
                  formik.touched.shortName && formik.errors.shortName
                    ? 'inputstyleTwo'
                    : 'inputstyle'
                }
                onChange={formik.handleChange}
                value={formik.values.shortName}
              />
              {formik.touched.shortName && formik.errors.shortName ? (
                <div style={{ color: 'red' }}>{formik.errors.shortName}</div>
              ) : null}
              <br />
              <br />
              <label htmlFor="">Code</label>
              <input
                type="text"
                placeholder="Code"
                name="code"
                className={
                  formik.touched.code && formik.errors.code
                    ? 'inputstyleTwo'
                    : 'inputstyle'
                }
                onChange={formik.handleChange}
                value={formik.values.code}
              />
              {formik.touched.code && formik.errors.code ? (
                <div style={{ color: 'red' }}>{formik.errors.code}</div>
              ) : null}
              <br />
              <br />
              <Alert />

              <Button
                variant="contained"
                className={classes.btn}
                color="secondary"
                type="submit"
              >
                Submit
              </Button>
            </form>
          </Grid>
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
