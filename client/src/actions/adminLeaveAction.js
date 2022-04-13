import axios from "axios";
import { ADD_LEAVE_TYPE, DELETE_LEAVE_TYPE, GET_LEAVE_TYPE, UPDATE_LEAVE_TYPE } from "./adminLeaveType";
import { setAlert } from "./alert";

export const getLeaveType = () =>
    async (dispatch) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        try {
            const res = await axios.get(
                "http://localhost:5000/admin/leave",
                config
            );

            dispatch({
                type: GET_LEAVE_TYPE,
                payload: res.data,
            });

        } catch (err) {
            const errors = err.response.data.errors;

            if (errors) {
                errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
            }
        }
    }
export const addLeaveType = ({ leaveType, numberLeave }) =>

    async (dispatch) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const body = JSON.stringify({ leaveType, numberLeave });
        try {
            const res = await axios.post(
                "http://localhost:5000/admin/leave",
                body,
                config
            )
            if (res?.status == 201) {
                dispatch(setAlert("successfully created", "success"))
            }
            dispatch({
                type: ADD_LEAVE_TYPE,
                payload: res.data,
            });

        } catch (err) {
            const errors = err?.response.data.errors;
            console.log(err)

            if (errors) {
                errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
            }
        }
    };
export const updateLeaveType = ({ leaveType, numberLeave, _id }) =>
    async (dispatch) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const body = JSON.stringify({ leaveType, numberLeave, _id });

        try {
            const res = await axios.patch(
                `http://localhost:5000/admin/leave/${_id}`,
                body,
                config
            );

            dispatch({
                type: UPDATE_LEAVE_TYPE,
                payload: res.data,
            });

        } catch (err) {
            const errors = err.response.data.errors;

            if (errors) {
                errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
            }
        }
    }
export const deleteLeaveType = (id) =>
    async (dispatch) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        try {
            const res = await axios.delete(
                `http://localhost:5000/admin/leave/${id}`,
                config,
                id
            );
            dispatch({
                type: DELETE_LEAVE_TYPE,
                payload: id,
            });

        } catch (err) {
            const errors = err.response.data.errors;
            if (errors) {
                errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
            }
        }
    }