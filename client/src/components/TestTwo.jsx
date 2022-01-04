import React,{useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { addLeaveType, getLeaveType, updateLeaveType,deleteLeaveType } from '../actions/adminLeaveAction';
import {Link} from 'react-router-dom';

function TestTwo() {
    const dispatch = useDispatch()
    const adminleave = useSelector((state) => state.adminleave);
    const auth = useSelector((state) => state.auth);
    useEffect(()=>{
        dispatch(getLeaveType())

    },[dispatch])    

    return (
        <div>
            
            <div>
            <Link to='/leave'>
            <p>Availabe Leave</p>
            </Link>
            <Link to='/addleave'>
            <p>Add Leave</p>
            </Link>
            <Link to='/userleave'>
            <p>My Leave</p>
            </Link>
            <Link to='/addleavetype'>
            <p>Add Leave Type</p>
            </Link>
            <Link to='/updateleavetype'>
            <p>Update Leave Type</p>
            </Link>
            <Link to='/updatepassword'>
            <p>Change Password</p>
            </Link>
            <Link to='/managerleave'>
            <p>Assigned Leave</p>
            </Link>
            
            </div>
        </div>
    )
}

export default TestTwo;
