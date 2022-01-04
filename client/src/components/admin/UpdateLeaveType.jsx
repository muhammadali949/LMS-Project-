import React from 'react'
import LeaveTypeTable from '../layout/LeaveTypeTable';
import { useDispatch, useSelector } from "react-redux";
import { deleteLeaveType } from '../../actions/adminLeaveAction';


function UpdateLeaveType() {
    const adminleave = useSelector((state) => state.adminleave);
    const dispatch = useDispatch()
    const HandleDeleteLeaveType = (id)=>{
        dispatch(deleteLeaveType(id))
    }


    return (
        <div style={{marginTop:"100px"}}>
            <LeaveTypeTable adminleave={adminleave} HandleDeleteLeaveType={HandleDeleteLeaveType}/>
        </div>
    )
}

export default UpdateLeaveType;
