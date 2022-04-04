import React, { useState, useEffect } from 'react';
import SelectData from '../layout/SelectData';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import axios from 'axios';
import { updateLeave } from '../../actions/leaveAction';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

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
const initiaValues = {
  _id: null,
  name: '',
  leaveDate: null,
  leaveCategory: '',
  leaveDescription: '',
  status: '',
  userid: null,
  date: null,
};
function UpdateStatus() {
  const [Istatus, setIStatus] = useState(initiaValues);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();

  const { id } = useParams();
  const HandleUpdate = () => {
    dispatch(updateLeave(Istatus, id));
    navigate(-1);
  };

  const getLeaveById = async (id) => {
    await axios.get(`http://localhost:5000/users/request/${id}`).then((res) => {
      setIStatus(res.data);
    });
  };
  useEffect(() => {
    getLeaveById(id);
    return () => {};
  }, []);
  return (
    <>
      <div className={classes.mainContainer}>
        <h3 style={{ marginTop: '5px' }}>Update Status</h3>

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
            <label htmlFor="">Update Status</label>
            <select
              name="select"
              className="inputstyle"
              placeholder="Enter a Description"
              value={Istatus.status}
              onChange={(event) =>
                setIStatus({ ...Istatus, status: event.target.value })
              }
            >
              <option value="Pending">Pending</option>
              <option value="Granted">Granted</option>
              <option value={'Rejected'}>Rejected</option>
              {/* {adminleave.map(function (n) {
                return (
                  <option
                    key={n._id}
                    value={n.leaveType}
                    selected={leaveCategory}
                    placeholder="Enter a Description"
                  >
                    {n.leaveType}
                  </option>
                ); */}
              {/* })} */}
            </select>
            <br />
            <br />
            <Button
              className={classes.btn}
              variant="contained"
              onClick={HandleUpdate}
              color="secondary"
            >
              Update
            </Button>
          </Grid>
          {/* <SelectData setIStatus={setIStatus} Istatus={Istatus} />
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              marginTop: '10px',
            }}
          >
            <Button
              className={classes.btn}
              variant="contained"
              onClick={HandleUpdate}
              color="secondary"
            >
              Update
            </Button>
          </div> */}
        </div>
      </div>
    </>
  );
}

export default UpdateStatus;
