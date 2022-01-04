import React, { useState } from "react";
import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { register } from "../../../actions/./authAction/auth";
import PropTypes from "prop-types";
import Alert from "../../layout/Alert";
import { setAlert } from "../../../actions/alert";
import DatePickers from "./DatePickers";
import SelectUser from "./SelectUser";

const Register = ({ setAlert, register }) => {
	
	const [datepicker, setDatePicker] = useState(new Date());
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [password2, setPassword2] = useState('')
	const [manager,setManager] = useState('');
	console.log(datepicker)
	console.log(manager)
	
	const Handlesubmit = (e)=>{
		e.preventDefault()
		if (password !== password2) {
			setAlert("Password do not match", "danger");
		} else {
			console.log(datepicker)
			register({ name, email, password ,datepicker,manager});
				setAlert("User added","success")
				setDatePicker(null)
			
		}

	}
	return (
		<div className="register-form">
			<h1 className="heading">Add User</h1>
			<p className="lead">
				<i className="fas fa-user"></i> Create An Account
			</p>
			<Alert />
			<br />
			<form className="form">
				<div className="form-group">
					<input
						type="text"
						placeholder="Name"
						name="name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
				<div className="form-group">
					<input
						type="email"
						placeholder="Email Address"
						name="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div className="form-group">
					<input
						type="password"
						placeholder="Password"
						name="password"
						minLength="6"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<div className="form-group">
					<input
						type="password"
						placeholder="Confirm Password"
						name="password2"
						minLength="6"
						value={password2}
						onChange={(e) => setPassword2(e.target.value)}
					/>
				</div>
				<div className="form-group" style={{marginLeft:'252px'}}>
					<DatePickers datepicker={datepicker} setDatePicker={setDatePicker} />
				</div>
				<div className="form-group" style={{marginLeft:'252px',marginTop:'10px'}}>
					<SelectUser manager={manager} setManager={setManager} />
				</div>
				<button  className="btn btn-primary" onClick={Handlesubmit} >Submit</button>
			</form>
			
		</div>
	);
};

Register.propTypes = {
	setAlert: PropTypes.func.isRequired,
	register: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);