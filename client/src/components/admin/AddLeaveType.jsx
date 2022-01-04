import React, {  useState } from "react";
import Alert from "../layout/Alert";
import { useDispatch, useSelector } from "react-redux";
import { addLeaveType } from "../../actions/adminLeaveAction";
import {useNavigate } from 'react-router-dom';



const AddLeaveType = () => {
    const dispatch = useDispatch()

	const [formData, setFormData] = useState({
		leaveType: "",
		numberLeave: "",
	});
    const navigate = useNavigate();

	const { leaveType, numberLeave } = formData;

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async (e) => {
		e.preventDefault();
        console.log(leaveType,numberLeave)
        dispatch(addLeaveType({leaveType,numberLeave}));
        navigate('/updateleavetype')

	};


	return (
        <>		
        <div className="login-form">
			<h1 className="heading">Add Leave Type And Number</h1>
			<Alert />
			<br />
			<form className="form" onSubmit={(e) => onSubmit(e)}>
				<div className="form-group">
					<input
						type="text"
						placeholder="Add Leave Type"
						name="leaveType"
						value={leaveType}
						onChange={(e) => onChange(e)}
						required
					/>
				</div>
				<div className="form-group">
					<input
						type="text"
						placeholder="Add Number"
						name="numberLeave"
						value={numberLeave}
						onChange={(e) => onChange(e)}
						required
					/>
				</div>
				<input type="submit" className="btn" value="submit" />
			</form>
			
		</div>
        </>

	);
};



export default AddLeaveType;