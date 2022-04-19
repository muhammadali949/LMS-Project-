import {
    ADD_LEAVE, DELETE_LEAVE, GET_LEAVE, UPDATE_LEAVE, GET_LEAVE_PENDEING, GET_LEAVE_GRANTED, GET_LEAVE_REJECTED
} from "../actions/leaveType";



function leave(leave = [], action) {
    const { type, payload } = action;
    switch (type) {
        case GET_LEAVE:
            return payload.reverse()
        case ADD_LEAVE:
            return payload.reverse()
        case GET_LEAVE_PENDEING:
            return payload.reverse()
        case GET_LEAVE_GRANTED:
            return payload.reverse()
        case GET_LEAVE_REJECTED:
            return payload.reverse()
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