import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { makeStyles } from '@material-ui/core';
import axios from 'axios';
import { updateLeave } from '../../../actions/leaveAction';
import moment from 'moment';
import { LEAVE_URL } from '../../../apis/apiUrls';

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
    color: '#fff',
    '&:hover': {
      //you want this to be the same as the backgroundColor above
      backgroundColor: '#0EA900',
    },
  },
}));

export default function Modal({ id, setupdate, update }) {
  const [open, setOpen] = useState(false);
  const [Istatus, setIStatus] = useState({});
  const navigate = useNavigate();
  const classes = useStyles();
  const dispatch = useDispatch();

  //   const { id } = useParams();

  const getLeaveById = async (id) => {
    await axios.get(`${LEAVE_URL}/${id}`).then((res) => {
      setIStatus(res.data);
    });
  };
  useEffect(() => {
    getLeaveById(id);
  }, []);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const formik = useFormik({
    initialValues: {
      status: '',
      adminRemark: '',
    },
    validationSchema: Yup.object({
      status: Yup.string().required('Please choose an action'),
      adminRemark: Yup.string().required('Description is required'),
    }),
    onSubmit: (values) => {
      let status = values.status;
      let adminRemark = values.adminRemark;
      const body = {
        _id: id,
        status: status,
        adminRemark,
        adminActionDate: moment(Date.now()).format('DD/MM/YYYY'),
        date: Istatus.date,
      };
      dispatch(updateLeave(body, id));
      navigate(`/leavedetails/${id}`);
      setOpen(false);
      setupdate((prevCheck) => !prevCheck);
    },
  });

  return (
    <div>
      <Button className={classes.btn} onClick={handleClickOpen}>
        Take Action
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        fullWidth
      >
        <DialogTitle id="form-dialog-title">Take Action</DialogTitle>
        <div className={classes.mainContainer}>
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
            <form onSubmit={formik.handleSubmit}>
              <DialogContent>
                <div>
                  <select
                    name="status"
                    className={
                      formik.touched.status && formik.errors.status
                        ? 'inputstyleTwo'
                        : 'inputstyle'
                    }
                    onChange={formik.handleChange}
                    value={formik.values.status}
                  >
                    <option value="" disabled hidden>
                      Select
                    </option>
                    <option value="Pending">Pending</option>
                    <option value="Granted">Granted</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>
                {formik.touched.status && formik.errors.status ? (
                  <div style={{ color: 'red' }}>{formik.errors.status}</div>
                ) : null}
                <br />
                <div>
                  <input
                    id="standard-basic"
                    name="adminRemark"
                    placeholder="Write a description"
                    label="Standard"
                    className={
                      formik.touched.adminRemark && formik.errors.adminRemark
                        ? 'inputstyleTwo'
                        : 'inputstyle'
                    }
                    onChange={formik.handleChange}
                    value={formik.values.adminRemark}
                    fullWidth
                  />
                </div>
                {formik.touched.adminRemark && formik.errors.adminRemark ? (
                  <div style={{ color: 'red' }}>
                    {formik.errors.adminRemark}
                  </div>
                ) : null}
                <br />
                <Button className={classes.btn} type="submit">
                  Add
                </Button>
              </DialogContent>
            </form>
          </div>
        </div>
        <br />
      </Dialog>
    </div>
  );
}
