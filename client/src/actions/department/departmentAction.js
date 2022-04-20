import axios from "axios";
import { ADD_DEPARTMENT, DELETE_DEPARTMENT, UPDATE_DEPARTMENT, GET_DEPARTMENT } from "./type";
import { setAlert } from "../alert";
import { DEPARTMENT_URL } from "../../apis/apiUrls";

export const getDepartment = () =>
    async (dispatch) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        try {
            const res = await axios.get(
                DEPARTMENT_URL,
                config
            );

            dispatch({
                type: GET_DEPARTMENT,
                payload: res.data,
            });

        } catch (err) {
            const errors = err.response.data.errors;

            if (errors) {
                errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
            }
        }
    }
export const addDepartmentReq = ({ name, shortName, code }) =>

    async (dispatch) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const body = JSON.stringify({ name, shortName, code });
        try {
            const res = await axios.post(
                DEPARTMENT_URL,
                body,
                config
            )
            if (res?.status == 201) {
                dispatch(setAlert("successfully created", "success"))
            }
            dispatch({
                type: ADD_DEPARTMENT,
                payload: res.data,
            });

        } catch (err) {
            const errors = err?.response.data.errors;

            if (errors) {
                errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
            }
        }
    };
export const updateLeaveType = ({ name, shortName, code, _id }) =>
    async (dispatch) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const body = JSON.stringify({ name, shortName, code, _id });

        try {
            const res = await axios.patch(
                `${DEPARTMENT_URL}/${_id}`,
                body,
                config
            );

            dispatch({
                type: UPDATE_DEPARTMENT,
                payload: res.data,
            });

        } catch (err) {
            const errors = err.response.data.errors;

            if (errors) {
                errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
            }
        }
    }
export const deleteDepartment = (id) =>
    async (dispatch) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        try {
            const res = await axios.delete(
                `${DEPARTMENT_URL}/${id}`,
                config,
                id
            );
            dispatch({
                type: DELETE_DEPARTMENT,
                payload: id,
            });

        } catch (err) {
            const errors = err.response.data.errors;
            if (errors) {
                errors.forEach((error) => dispatch(setAlert(error.msg, "danger")));
            }
        }
    }