import { ADD_LEAVE, GET_LEAVE, UPDATE_LEAVE } from "../actions/leaveType";



function leave(leave = [], action) {
    const { type, payload } = action;
    console.log(leave)
    console.log("payload..................")
    console.log(payload)
    switch (type) {
        case GET_LEAVE:
            return payload;
        case ADD_LEAVE:
            return [payload, ...leave]
        case UPDATE_LEAVE:
            return leave.map((todo) =>
                todo._id === payload._id ? payload : todo
            );
        default:
            return leave;
    }
}
export default leave;