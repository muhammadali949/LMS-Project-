import axios from 'axios';
import { setAlert } from './alert';
import { ADD_LEAVE, GET_LEAVE, UPDATE_LEAVE } from './leaveType';

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
export const addLeave = ({ leaveDate, leaveCategory, leaveDescription }) =>
    async (dispatch) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const body = JSON.stringify({ leaveDate, leaveCategory, leaveDescription });
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

        } catch (err) {
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
            const res = await axios.put(
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