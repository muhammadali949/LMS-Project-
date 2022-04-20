import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import store from '../../../store';
import {
  deleteDepartment,
  getDepartment,
} from '../../../actions/department/departmentAction';
import DepartmentTable from './DepartmentTable';

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
}));

function ManageDepartment() {
  const department = useSelector((state) => state.department);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [q, setQ] = useState('');

  function search(rows) {
    const columns = ['name', 'shortName', 'code'];
    return rows?.filter((row) =>
      columns.some(
        (column) =>
          row[column].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
      )
    );
  }

  const HandleDeletedepartment = (id) => {
    dispatch(deleteDepartment(id));
  };
  useEffect(() => {
    store.dispatch(getDepartment());
  }, []);
  return (
    <div className={classes.mainContainer}>
      <h3 style={{ marginTop: '5px' }} className="title">
        MANAGE DEPARTMENT
      </h3>
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
        <DepartmentTable
          department={search(department)}
          HandleDeletedepartment={HandleDeletedepartment}
          setQ={setQ}
          q={q}
        />
        <br />
      </div>
    </div>
  );
}

export default ManageDepartment;
