import React, { useState, useEffect } from 'react';
import SelectData from '../layout/SelectData';
import { useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import axios from 'axios';
import { updateLeave } from '../../actions/leaveAction';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  btn: {
    background: '#0EA900',
    '&:hover': {
      //you want this to be the same as the backgroundColor above
      backgroundColor: '#0EA900',
    },
  },
});
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
      <div
        style={{ display: 'flex', justifyContent: 'center', marginTop: '70px' }}
      >
        <SelectData setIStatus={setIStatus} Istatus={Istatus} />
      </div>
      <div
        style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}
      >
        <Button
          className={classes.btn}
          variant="contained"
          onClick={HandleUpdate}
          color="secondary"
        >
          Update
        </Button>
      </div>
    </>
  );
}

export default UpdateStatus;
