import React, {  useState ,useEffect} from "react";
import Alert from "../layout/Alert";
import { useDispatch, useSelector } from "react-redux";
import {  updateLeaveType } from "../../actions/adminLeaveAction";
import {useParams,useNavigate } from 'react-router-dom';
import axios from 'axios'
import UpdateDatePickers from "./UpdateDatePickers";
import { updateLeave } from "../../actions/leaveAction";
const UpdateMyLeave = () => {
    const dispatch = useDispatch()

	const [formData, setFormData] = useState({
        leaveDate: new Date(),
		leaveCategory: "",
		leaveDescription: "",
	});
    const navigate = useNavigate();
    const { id } = useParams();
	const { leaveCategory, leaveDescription,leaveDate,_id} = formData;
 
	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value});
       

	const onSubmit = async (e) => {
		e.preventDefault();
        await setFormData({...formData,_id:id})
        console.log(leaveCategory,leaveDescription,leaveDate)
        dispatch(updateLeave(formData,id))
        navigate('/userleave');


	};
    const getLeaveById = async (id)=>{
        await axios.get(`http://localhost:5000/users/request/${id}`).then(res=>{
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
			<h1 className="heading">Update MyLeave</h1>
			<Alert />
			<br />
			<form className="form" onSubmit={(e) => onSubmit(e)}>
            <div className="form-group">
				<UpdateDatePickers  formData={formData} setFormData={setFormData}/>
				</div>
				<div className="form-group">
					<input
						type="text"
						placeholder="Add leaveCategory"
						name="leaveCategory"
						value={leaveCategory}
						onChange={(e) => onChange(e)}
						required
					/>
				</div>
				<div className="form-group">
					<input
						type="text"
						placeholder="Add leaveDescription"
						name="leaveDescription"
						value={leaveDescription}
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
export default UpdateMyLeave

