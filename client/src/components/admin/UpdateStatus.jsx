import React,{useState,useEffect} from 'react'
import SelectData from '../layout/SelectData';
import { useDispatch } from "react-redux";
import {useParams,useNavigate } from 'react-router-dom';
import axios from 'axios'
import { updateLeave } from '../../actions/leaveAction';

const initiaValues =
{
    _id: null,
    name: '',
    leaveDate: null,
    leaveCategory: '',
    leaveDescription: '',
    status:'',
    userid:null,
    date:null
}
function UpdateStatus() {
    const [Istatus, setIStatus] = useState(initiaValues)
    const dispatch = useDispatch()
    const navigate = useNavigate();


    console.log(Istatus)
    
    const { id } = useParams();
    const HandleUpdate = () =>{
        dispatch(updateLeave(Istatus,id))
        navigate(-1);

    }
    
    const getLeaveById = async (id)=>{
        await axios.get(`http://localhost:5000/users/request/${id}`).then(res=>{
            setIStatus(res.data)
        })
    }
    useEffect(() => {
        getLeaveById(id)
        return () => {
        }
    }, [])
    return (
        <>
            <div style={{display:'flex',justifyContent:'center',marginTop:'70px'}}>
                <SelectData  setIStatus={setIStatus} Istatus={Istatus} />
            </div>
            <div style={{display:'flex',justifyContent:'center',marginTop:'10px'}}>
                <button onClick={HandleUpdate}>Update</button>
            </div>
     </>
        
    )
}

export default UpdateStatus;
