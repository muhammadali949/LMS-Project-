import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from "react-redux";
import MyLeaveTable from '../layout/MyLeaveTable';
import { deleteLeave } from '../../actions/leaveAction';

function UserLeave() {
    const auth = useSelector((state) => state.auth);
   
    const id = auth.user._id;
    const dispatch = useDispatch()
    const HandleDeleteLeaveType = (id)=>{
        dispatch(deleteLeave(id))
    }

    return (
        <div style={{marginTop:'100px'}}>
            <MyLeaveTable  HandleDeleteLeaveType={HandleDeleteLeaveType} id={id}/>
        </div>
    )
}

export default UserLeave;
