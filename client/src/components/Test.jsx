import React,{useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { addLeave, deleteLeave, getLeave, updateLeave } from '../actions/leaveAction';
import Alert from './layout/Alert';

function Test() {
    const dispatch = useDispatch()
    const leave = useSelector((state) => state.leave);

    const  a = {
        _id:'61bccb68105b315be6cef51d',
        leaveDate:'01-01-2025',
        leaveCategory:'ali',
        leaveDescription:'ali',
        status:'granted'
    }
    const id = '61bccb68105b315be6cef51d'
    useEffect(()=>{
        dispatch(getLeave())
        dispatch(updateLeave(a,id))
      
    },[dispatch])
    return (
        <div>
            {
                leave?.map(l =>{
                    return (
                     <div style={{display:'flex',justifyContent:'center'}}>  
                    <h1>{l.leaveDate}</h1>
                    <button onClick={()=>dispatch(deleteLeave(l._id))}>Delete</button>
                    </div> 
                    )
                })
            }
            <br/>
            <br/>
            <br/>

            <button onClick={()=>{dispatch(addLeave(a))}}>Click me</button>
        </div>
    )
}

export default Test;
