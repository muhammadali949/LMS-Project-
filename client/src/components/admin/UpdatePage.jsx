import React, {  useState ,useEffect} from "react";
import Alert from "../layout/Alert";
import { useDispatch, useSelector } from "react-redux";
import {  updateLeaveType } from "../../actions/adminLeaveAction";
import {useParams,useNavigate } from 'react-router-dom';
import axios from 'axios'
const UpdatePage = () => {
    const dispatch = useDispatch()

	const [formData, setFormData] = useState({
		leaveType: "",
		numberLeave: "",
	});
    const navigate = useNavigate();
    const { id } = useParams();
	const { leaveType, numberLeave } = formData;

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async (e) => {
		e.preventDefault();
        console.log(leaveType,numberLeave)
        dispatch(updateLeaveType({leaveType,numberLeave,_id:id}));
        navigate('/updateleavetype');


	};
    const getLeaveById = async (id)=>{
        await axios.get(`http://localhost:5000/admin/leave/${id}`).then(res=>{
            setFormData(res.data)
            
        })
    }
    useEffect(() => {
        getLeaveById(id)
        return () => {
        }
    }, [])


	return (
        <>		
        <div className="login-form">
			<h1 className="heading">Update Leave Type And Number</h1>
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
export default UpdatePage;
