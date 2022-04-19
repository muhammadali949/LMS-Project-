import React, { useState, useEffect } from 'react';
import Alert from '../../layout/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { updateLeaveType } from '../../../actions/department/departmentAction';

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
      //you want this to be the same as the backgroundColor above
      backgroundColor: '#0EA900',
    },
  },
}));
const UpdateDepartment = () => {
  const dispatch = useDispatch();
  const classes = useStyles();

  const [formData, setFormData] = useState({
    name: '',
    shortName: '',
    code: '',
  });
  const navigate = useNavigate();
  const { id } = useParams();
  const { name, shortName, code } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(updateLeaveType({ name, shortName, code, _id: id }));
    navigate('/managedepartment');
  };
  const getLeaveById = async (id) => {
    await axios
      .get(`http://localhost:5000/admin/department/${id}`)
      .then((res) => {
        setFormData(res.data);
      });
  };
  useEffect(() => {
    getLeaveById(id);
  }, []);

  return (
    <>
      <div className={classes.mainContainer}>
        <h3 style={{ marginTop: '5px' }} className="title">
          UPDATE DEPARTMENT
        </h3>{' '}
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
            <input
              type="text"
              className="inputstyle"
              placeholder="Add Name"
              name="name"
              value={name}
              onChange={(e) => onChange(e)}
              required
            />
            <br />
            <br />
            <input
              type="text"
              className="inputstyle"
              placeholder="Add Short Name"
              name="shortName"
              value={shortName}
              onChange={(e) => onChange(e)}
              required
            />
            <br />
            <br />
            <input
              type="text"
              className="inputstyle"
              placeholder="Add Code"
              name="code"
              value={code}
              onChange={(e) => onChange(e)}
              required
            />
            <br />
            <br />
            <Alert />
            <Button
              variant="contained"
              className={classes.btn}
              color="secondary"
              onClick={onSubmit}
            >
              update
            </Button>
          </Grid>
        </div>
      </div>
    </>
  );
};
export default UpdateDepartment;
