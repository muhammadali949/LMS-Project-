
import {
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT,
    UPDATE_PASSWORD,
} from "../actions/types";

const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: !!localStorage.getItem("token"),
    loading: true,
    user: null,
    datepicker: null,
    role: ''
};

function auth(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: !!localStorage.getItem("token"),
                loading: false,
                user: payload,
            };

        case LOGIN_SUCCESS:
            localStorage.setItem("token", payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false,
                datepicker: payload.datepicker,
                role: payload.role

            };

        case AUTH_ERROR:
        case LOGIN_FAIL:
        case UPDATE_PASSWORD:
        case LOGOUT:
            localStorage.removeItem("token");
            return {
                ...state,
                token: null,
                isAuthenticated: !!localStorage.getItem("token"),
                loading: false,


            };
        default:
            return state;
    }
}
export default auth;