import React, { useState } from "react";
import Alert from "../layout/Alert";
import { addLeave } from "../../actions/leaveAction";
import { useDispatch, useSelector } from "react-redux";
import DatePickers from "../auth/register/DatePickers";
import { setAlert } from "../../actions/alert";



const AddLeave = () => {
    const leave = useSelector((state) => state.leave);
	const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch()
	const [leaveDate, setLeaveDate] = useState(new Date());
	const [leaveCategory, setLeaveCategory] = useState('')
	const [leaveDescription, setLeaveDescription] = useState('')
	const Handlesubmit = async (e)=>{
		e.preventDefault()
             dispatch(addLeave({ leaveDate, leaveCategory, leaveDescription,userid:auth.user._id,name:auth.user.name,manager:auth.user.manager}))
			alert("Leave request has been send")
            
	}
	return (
		<div className="register-form">
			<h1 className="heading">Add Leave</h1>
			<Alert />
			<br />
			<form className="form">
                <div className="form-group" style={{marginLeft:'252px'}}> 
                <DatePickers datepicker={leaveDate} setDatePicker={setLeaveDate} />
                </div>
				<div className="form-group">
					<input
						type="text"
						placeholder="leaveCategory"
						value={leaveCategory}
						onChange={(e) => setLeaveCategory(e.target.value)}
					/>
				</div>
				<div className="form-group">
					<input
						type="text"
						placeholder="leaveDescription"
						value={leaveDescription}
						onChange={(e) => setLeaveDescription(e.target.value)}
					/>
				</div>
				<button  className="btn btn-primary" onClick={Handlesubmit}>Add Leave</button>
			</form>
			
		</div>
	);
};


export default AddLeave;