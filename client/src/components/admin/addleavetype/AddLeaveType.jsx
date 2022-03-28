import React, {  useState } from "react";
import Alert from "../../layout/Alert";
import { useDispatch, useSelector } from "react-redux";
import { addLeaveType } from "../../../actions/adminLeaveAction";
import {useNavigate } from 'react-router-dom';



const AddLeaveType = () => {
    const dispatch = useDispatch()
	const [leaveType, setLeaveType] = useState('')
	const [numberLeave, setNumberLeave] = useState('')
    const navigate = useNavigate();

	

	const HandleSubmit = async (e) => {
		e.preventDefault();
        console.log(leaveType,numberLeave)
	   dispatch(addLeaveType({leaveType,numberLeave}));
		 
	};


	return (
        <>		
        <div className="login-form">
			<h1 className="heading">Add Leave Type And Number</h1>
			<Alert />
			<br />
			<form className="form">
				<div className="form-group">
					<input
						type="text"
						placeholder="Add Leave Type"
						name="leaveType"
						value={leaveType}
						onChange={(e) => setLeaveType(e.target.value)}
						required
					/>
				</div>
				<div className="form-group">
					<input
						type="text"
						placeholder="Add Number"
						name="numberLeave"
						value={numberLeave}
						onChange={(e) => setNumberLeave(e.target.value)}						
						required
					/>
				</div>
				<button data-testid='form' className="btn" onClick={HandleSubmit} >Submit</button>
			</form>
			
		</div>
        </>

	);
};



export default AddLeaveType;