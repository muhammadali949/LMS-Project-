import axios from 'axios';
import { setAlert } from './alert';
import { ADD_LEAVE, DELETE_LEAVE, GET_LEAVE, UPDATE_LEAVE } from './leaveType';
import { useNavigate } from 'react-router-dom';

export const getLeave = () =>

    async (dispatch) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        try {
            const res = await axios.get(
                "http://localhost:5000/users/request",
                config
            );

            dispatch({
                type: GET_LEAVE,
                payload: res.data,
            });

        } catch (err) {
            const errors = err.response.data.errors;

            if (errors) {
                errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
            }
        }
    }
export const addLeave = ({ name, leaveDate, leaveCategory, leaveDescription, userid, manager }) =>
    async (dispatch) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const body = JSON.stringify({ name, leaveDate, leaveCategory, leaveDescription, userid, manager });
        try {
            const res = await axios.post(
                "http://localhost:5000/users/request",
                body,
                config
            );
            dispatch({
                type: ADD_LEAVE,
                payload: res.data,
            });
            if (res?.status == 201) {
                dispatch(setAlert("successfully apply", "success"))
            }


        } catch (err) {
            console.log(err);
            const errors = err.response.data.errors;

            if (errors) {
                errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
            }
        }
    };
export const updateLeave = (a, id) =>

    async (dispatch) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        try {
            console.log("Action Leave")
            console.log(a)
            const res = await axios.patch(
                `http://localhost:5000/users/request/${id}`,
                a,
                config
            );

            dispatch({
                type: UPDATE_LEAVE,
                payload: res.data,
            });

        } catch (err) {
            const errors = err.response.data.errors;

            if (errors) {
                errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
            }
        }
    }
export const deleteLeave = (id) =>
    async (dispatch) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        try {
            const res = await axios.delete(
                `http://localhost:5000/users/request/${id}`,
                config,
                id
            );
            dispatch({
                type: DELETE_LEAVE,
                payload: id,
            });

        } catch (err) {
            const errors = err.response.data.errors;
            if (errors) {
                errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
            }
        }
    }