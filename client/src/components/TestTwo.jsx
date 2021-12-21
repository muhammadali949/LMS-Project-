import React,{useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { addLeaveType, getLeaveType, updateLeaveType,deleteLeaveType } from '../actions/adminLeaveAction';

function TestTwo() {
    const dispatch = useDispatch()
    const adminleave = useSelector((state) => state.adminleave);
    const  a = {
        _id:"61bdf8b9b5a0c4f89d3a8e31",
        leaveType:'aliiiiiiiiiiiii',
        numberLeave:12
    }
    const id ='61bdf8b9b5a0c4f89d3a8e31'
    useEffect(()=>{
        dispatch(getLeaveType())

    },[dispatch])    

    console.log(adminleave)
    return (
        <div>
            <button onClick={()=>{dispatch(addLeaveType(a))}}>add Leave</button>
            <button onClick={()=>{dispatch(updateLeaveType(a,id))}}>adit Leave</button>
            <button onClick={()=>{dispatch(deleteLeaveType(id))}}>Delete</button>


        </div>
    )
}

export default TestTwo;
