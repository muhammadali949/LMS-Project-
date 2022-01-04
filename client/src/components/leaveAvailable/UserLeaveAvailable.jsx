import React from 'react'
import { useDispatch, useSelector } from "react-redux";

function UserLeaveAvailable() {
    const adminleave = useSelector((state) => state.adminleave);
    const auth = useSelector((state) => state.auth);
    let date = auth.user.datepicker
    console.log(date)
    const newDate = new Date(date);
    let month = newDate.getMonth();
    console.log(month)


    return (
        <div style={{marginTop:'150px'}}>
              <div> 
                           {
                adminleave?.map(leave=>{
                    return (
                    <> 
                    <div style={{display:'flex'}}>   
                    <p style={{marginRight:'2px'}}>{leave.leaveType} :</p>
                    <p style={{marginLeft:'2px'}}>{((leave.numberLeave/12)*(12-month)).toFixed(1)}</p>
                    </div>
                  
                    </>
                    )
                })
            }
            </div>
        </div>
    )
}

export default UserLeaveAvailable;
