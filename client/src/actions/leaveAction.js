import axios from 'axios';
import { setAlert } from './alert';
import { ADD_LEAVE, DELETE_LEAVE, GET_LEAVE, UPDATE_LEAVE, GET_LEAVE_PENDEING, GET_LEAVE_GRANTED, GET_LEAVE_REJECTED } from './leaveType';

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
export const getLeavePending = () =>

    async (dispatch) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        try {
            const res = await axios.get(
                "http://localhost:5000/users/request/api?status=Pending",
                config
            );

            dispatch({
                type: GET_LEAVE_PENDEING,
                payload: res.data,
            });

        } catch (err) {
            const errors = err.response.data.errors;

            if (errors) {
                errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
            }
        }
    }
export const getLeaveGranted = () =>

    async (dispatch) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        try {
            const res = await axios.get(
                "http://localhost:5000/users/request/api?status=Granted",
                config
            );

            dispatch({
                type: GET_LEAVE_GRANTED,
                payload: res.data,
            });

        } catch (err) {
            const errors = err.response.data.errors;

            if (errors) {
                errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
            }
        }
    }
export const getLeaveRejected = () =>

    async (dispatch) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        try {
            const res = await axios.get(
                "http://localhost:5000/users/request/api?status=Rejected",
                config
            );

            dispatch({
                type: GET_LEAVE_REJECTED,
                payload: res.data,
            });

        } catch (err) {
            const errors = err.response.data.errors;

            if (errors) {
                errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
            }
        }
    }
export const addLeave = ({ name, leaveDate, leaveCategory, leaveDescription, userid, manager, employee, gender, email, phoneNo, adminActionDate, joinDate, date }) =>
    async (dispatch) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const body = JSON.stringify({ name, leaveDate, leaveCategory, leaveDescription, userid, manager, employee, gender, email, phoneNo, adminActionDate, joinDate, date });
        try {
            const res = await axios.post(
                "http://localhost:5000/users/request",
                body,
                config
            );
            dispatch({
                type: ADD_LEAVE,
                payload: res,
            });
        } catch (err) {
            const errors = err.response.data.errors;

            if (errors) {
                errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
                dispatch({
                    type: ADD_LEAVE,
                    payload: errors,
                });
            }
        }
    };
export const clearState = () =>

    async (dispatch) => {
        dispatch({
            type: ADD_LEAVE,
            payload: [{ msg: 'your leave request has been send' }],
        });
    }
export const updateLeave = (a, id) =>

    async (dispatch) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        try {
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