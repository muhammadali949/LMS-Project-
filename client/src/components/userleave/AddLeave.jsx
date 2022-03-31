import React, { useState, useEffect } from 'react';
import Alert from '../layout/Alert';
import { addLeave } from '../../actions/leaveAction';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import DatePickers from '../auth/register/DatePickers';
import { setAlert } from '../../actions/alert';
import Button from '@material-ui/core/Button';
import store from '../../store';
import { getLeaveType } from '../../actions/adminLeaveAction';

const useStyles = makeStyles({
  btn: {
    background: '#0EA900',
    '&:hover': {
      //you want this to be the same as the backgroundColor above
      backgroundColor: '#0EA900',
    },
  },
});
const AddLeave = () => {
  const leave = useSelector((state) => state.leave);
  const adminleave = useSelector((state) => state.adminleave);
  console.log(adminleave);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [leaveDate, setLeaveDate] = useState(new Date());
  const [leaveCategory, setLeaveCategory] = useState('');
  const [leaveDescription, setLeaveDescription] = useState('');
  const classes = useStyles();

  const Handlesubmit = async (e) => {
    e.preventDefault();
    dispatch(
      addLeave({
        leaveDate,
        leaveCategory,
        leaveDescription,
        userid: auth.user._id,
        name: `${auth.user.firstname} ${auth.user.lastname}`,
        manager: auth.user.manager,
      })
    );
  };
  useEffect(() => {
    store.dispatch(getLeaveType());
  }, []);
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        width: '90%',
        height: '100%',
        marginLeft: 'auto',
        marginTop: '2%',
        marginRight: 'auto',
        background: '#fff',
      }}
    >
      <h3 style={{ marginTop: '5px' }}>Apply For Leave</h3>
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
        <Grid style={{ width: '90%', marginLeft: 'auto', marginRight: 'auto' }}>
          <br />
          <form noValidate autoComplete="off">
            <label htmlFor="">Leave Type</label>
            <select
              name="select"
              className="inputstyle"
              placeholder="Enter a Description"
              value={leaveCategory}
              onChange={(event) => setLeaveCategory(event.target.value)}
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
            <DatePickers datepicker={leaveDate} setDatePicker={setLeaveDate} />
            <br />
            <br />
            <label htmlFor="">Description</label>
            <input
              id="standard-basic"
              className="inputstyle"
              placeholder="Enter a Description"
              value={leaveDescription}
              onChange={(e) => setLeaveDescription(e.target.value)}
              label="Standard"
              fullWidth
            />
            <br />
            <br />
            <Alert />
            <Button
              variant="contained"
              className={classes.btn}
              color="secondary"
              onClick={Handlesubmit}
            >
              Apply
            </Button>
          </form>
        </Grid>
      </div>
    </div>
    // <div className="register-form">
    // 	<h1 className="heading">Add Leave</h1>
    // 	<Alert />
    // 	<br />
    // 	<form className="form">
    //         <div className="form-group" style={{marginLeft:'252px'}}>
    //         <DatePickers datepicker={leaveDate} setDatePicker={setLeaveDate} />
    //         </div>
    // 		<div className="form-group">
    // 			<input
    // 				type="text"
    // 				placeholder="leaveCategory"
    // 				value={leaveCategory}
    // 				onChange={(e) => setLeaveCategory(e.target.value)}
    // 			/>
    // 		</div>
    // 		<div className="form-group">
    // 			<input
    // 				type="text"
    // 				placeholder="leaveDescription"
    // 				value={leaveDescription}
    // 				onChange={(e) => setLeaveDescription(e.target.value)}
    // 			/>
    // 		</div>
    // 		<button  className="btn btn-primary" onClick={Handlesubmit}>Add Leave</button>
    // 	</form>

    // </div>
  );
};

export default AddLeave;
