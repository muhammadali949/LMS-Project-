import React, {  useState } from "react";
import {  Navigate } from "react-router-dom";
import Alert from "../../layout/Alert";
import { useSelector,useDispatch } from "react-redux";
import { updatepassword } from "../../../actions/./authAction/auth";
import { setAlert } from "../../../actions/alert";

const UpdatePassword = () => {
    const dispatch = useDispatch()
    const auth = useSelector((state) => state.auth);
    const [password, setPassword] = useState('')
	const [password2, setPassword2] = useState('')
    const _id = auth.user._id;
	console.log(_id)
    const role=auth.user.role;
		


	const onSubmit = async (e) => {
		e.preventDefault();
        console.log(password)
        console.log(password2)

        if (password !== password2) {
			setAlert("Password do not match", "danger");
            alert("password do not match")
		} else {
            await dispatch(updatepassword({_id,role,password}))
            setAlert("update...","success")
		}
	};

	return (
        <>		
        <div className="login-form">
			<h1 className="heading">Update Password</h1>
			<Alert/>
			<br />
			<form className="form">
				<div className="form-group">
					<input
						type="password"
						placeholder="Enter a new Password"
						name="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
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
						required
					/>
				</div>
                <button className="btn" onClick={onSubmit}>Update Password</button>
			</form>
			
		</div>
        </>

	);
};


export default UpdatePassword;
