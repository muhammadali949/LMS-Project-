import axios from 'axios';
import { LEAVE_URL, UPDATE_USER_URL } from '../apis/apiUrls';
import { setAlert } from './alert';
import { ADD_LEAVE, DELETE_LEAVE, GET_LEAVE, UPDATE_LEAVE, GET_LEAVE_PENDEING, GET_LEAVE_GRANTED, GET_LEAVE_REJECTED, GET_LEAVE_BY_ID, LEAVE_COUNT } from './leaveType';

export const getLeave = () =>

    async (dispatch) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        try {
            const res = await axios.get(
                LEAVE_URL,
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
export const getLeaveById = (id) =>

    async (dispatch) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        try {
            const res = await axios.get(
                `${UPDATE_USER_URL}/request/userleave/${id}`,
                config
            );

            dispatch({
                type: GET_LEAVE_BY_ID,
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
                `${LEAVE_URL}/api?status=Pending`,
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
                `${LEAVE_URL}/api?status=Granted`,
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
                `${LEAVE_URL}/api?status=Rejected`,
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
                LEAVE_URL,
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
            payload: [{ msg: 'Request is already send on this date' }],
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
                `${LEAVE_URL}/${id}`,
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
                `${LEAVE_URL}/${id}`,
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