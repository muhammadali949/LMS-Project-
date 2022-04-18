import {
    ADD_LEAVE, DELETE_LEAVE, GET_LEAVE, UPDATE_LEAVE, GET_LEAVE_PENDEING, GET_LEAVE_GRANTED, GET_LEAVE_REJECTED
} from "../actions/leaveType";



function leave(leave = [], action) {
    const { type, payload } = action;
    // console.log("this is the pay load")
    // console.log(payload)
    switch (type) {
        case GET_LEAVE:
            return payload
        case ADD_LEAVE:
            return payload
        case GET_LEAVE_PENDEING:
            return payload
        case GET_LEAVE_GRANTED:
            return payload
        case GET_LEAVE_REJECTED:
            return payload
        case UPDATE_LEAVE:
            return leave.map((l) =>
                l._id === payload._id ? payload : l
            );
        case DELETE_LEAVE:
            return leave.filter((todo) => todo._id !== payload);
        default:
            return leave;
    }
}
export default leave;