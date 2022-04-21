import axios from "axios";
import { Navigate } from 'react-router-dom';

import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    UPDATE_PASSWORD,
    USER_All_LOADED,
} from "../types";
import setAuthToken from "../../utils/setAuthToken";
import { setAlert } from "../alert";
import { LOGIN_URL, LOAD_USER_URL, LOAD_ALL_USER_URL, REGISTER_URL, UPDATE_PASSWORD_URL } from "../../apis/apiUrls";

// Load User
export const loadUser = () => async (dispatch) => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get(LOAD_USER_URL);

        dispatch({
            type: USER_LOADED,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: AUTH_ERROR,
        });
    }
};
export const loadAllUser = () => async (dispatch) => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get(LOAD_ALL_USER_URL);
        dispatch({
            type: USER_All_LOADED,
            payload: res.data,
        });
    } catch (err) {
        dispatch({
            type: AUTH_ERROR,
        });
    }
};

// Register User
export const register = ({ datepicker,
    employee,
    joinDate,
    gender,
    firstname,
    lastname,
    department,
    position,
    address,
    phoneNo,
    email,
    password,
    manager,
    role }) =>
    async (dispatch) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const body = JSON.stringify({
            datepicker,
            employee,
            gender,
            firstname,
            lastname,
            department,
            position,
            address,
            phoneNo,
            email,
            password,
            manager,
            joinDate,
            role
        });

        try {
            const res = await axios.post(
                REGISTER_URL,
                body,
                config
            );
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data,
            });
            if (res.status == 201) {
                dispatch(setAlert("Employee created successfully", "success"))
            }

            dispatch(loadUser());
        } catch (err) {
            const errors = err.response.data.errors;

            if (errors) {
                errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
            }

            dispatch({
                type: REGISTER_FAIL,
            });
        }
    };

// Login User


export const login = (email, password) => async (dispatch) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post(
            LOGIN_URL,
            body,
            config
        );
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data,
        });
        console.log(res.data)
        console.log('&&&&&&&&&&&&')
        console.log(res.data)


        dispatch(loadUser());
    } catch (err) {
        const errors = err.response.data.errors;

        if (errors) {
            errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
        }

        dispatch({
            type: LOGIN_FAIL,
        });
    }
};
//Update Password
export const updatepassword = ({ _id, password, role, currentPassword, email }) =>
    async (dispatch) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const body = JSON.stringify({ _id, password, role, currentPassword, email });

        try {
            const res = await axios.patch(
                UPDATE_PASSWORD_URL,
                body,
                config
            );


            dispatch({
                type: UPDATE_PASSWORD,
            });
        } catch (err) {
            const errors = err.response.data.errors;
            if (errors) {
                errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
            }
            dispatch({
                type: REGISTER_FAIL,
            });
        }
    };

// Logout / Clear Profile

export const logout = () => (dispatch) => {
    dispatch({ type: LOGOUT });
};