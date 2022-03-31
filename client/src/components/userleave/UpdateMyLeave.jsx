import React, { useState, useEffect } from 'react';
import Alert from '../layout/Alert';
import { useDispatch, useSelector } from 'react-redux';
import { updateLeaveType } from '../../actions/adminLeaveAction';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import UpdateDatePickers from './UpdateDatePickers';
import { updateLeave } from '../../actions/leaveAction';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  btn: {
    background: '#0EA900',
    '&:hover': {
      //you want this to be the same as the backgroundColor above
      backgroundColor: '#0EA900',
    },
  },
});
const UpdateMyLeave = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const adminleave = useSelector((state) => state.adminleave);

  const [formData, setFormData] = useState({
    leaveDate: new Date(),
    leaveCategory: '',
    leaveDescription: '',
  });
  const navigate = useNavigate();
  const { id } = useParams();
  const { leaveCategory, leaveDescription, leaveDate, _id } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    await setFormData({ ...formData, _id: id });
    console.log(leaveCategory, leaveDescription, leaveDate);
    dispatch(updateLeave(formData, id));
    navigate('/userleave');
  };
  const getLeaveById = async (id) => {
    await axios.get(`http://localhost:5000/users/request/${id}`).then((res) => {
      setFormData(res.data);
    });
  };
  useEffect(() => {
    getLeaveById(id);
    return () => {};
  }, []);

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          width: '90%',
          height: '50vh',
          marginLeft: 'auto',
          marginTop: '2%',
          marginRight: 'auto',
          background: '#fff',
        }}
      >
        <h3 style={{ marginTop: '5px' }}>Update Leave</h3>
        <div
          style={{
            minHeight: '59vh',
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
            <form noValidate autoComplete="off">
              <label htmlFor="">Leave Type</label>
              <select
                name="leaveCategory"
                className="inputstyle"
                value={leaveCategory}
                onChange={(e) => onChange(e)}
              >
                <option value="" disabled hidden>
                  Select Leave Type
                </option>{' '}
                {adminleave.map(function (n) {
                  return (
                    <option
                      key={n._id}
                      value={n.leaveType}
                      selected={leaveCategory}
                      placeholder="Enter a Description"
                    >
                      {n.leaveType}
                    </option>
                  );
                })}
              </select>
              <br />
              <br />
              <label htmlFor="">Date</label>
              <UpdateDatePickers
                formData={formData}
                setFormData={setFormData}
              />
              <br />
              <br />
              <label htmlFor="">Description</label>
              <input
                id="standard-basic"
                className="inputstyle"
                placeholder="Enter a Description"
                name="leaveDescription"
                value={leaveDescription}
                onChange={(e) => onChange(e)}
                label="Standard"
                fullWidth
              />
              <br />
              <br />
              <Button
                variant="contained"
                className={classes.btn}
                color="secondary"
                onClick={onSubmit}
              >
                Update
              </Button>
            </form>
          </Grid>
        </div>
      </div>
      {/* <div className="login-form">
			<h1 className="heading">Update MyLeave</h1>
			<Alert />
			<br />
			<form className="form" onSubmit={(e) => onSubmit(e)}>
            <div className="form-group">
				<UpdateDatePickers  formData={formData} setFormData={setFormData}/>
				</div>
				<div className="form-group">
					<input
						type="text"
						placeholder="Add leaveCategory"
						name="leaveCategory"
						value={leaveCategory}
						onChange={(e) => onChange(e)}
						required
					/>
				</div>
				<div className="form-group">
					<input
						type="text"
						placeholder="Add leaveDescription"
						name="leaveDescription"
						value={leaveDescription}
						onChange={(e) => onChange(e)}
						required
					/>
				</div>
				<input type="submit" className="btn" value="submit" />
			</form>
			
		</div> */}
    </>
  );
};
export default UpdateMyLeave;
