import { ADD_LEAVE_TYPE, DELETE_LEAVE_TYPE, GET_LEAVE_TYPE, UPDATE_LEAVE_TYPE } from "../actions/adminLeaveType";

function adminleave(adminleavetype = [], action) {
    const { type, payload } = action;
    switch (type) {
        case GET_LEAVE_TYPE:
            return payload;
        case ADD_LEAVE_TYPE:
            return [payload, ...adminleavetype]
        case UPDATE_LEAVE_TYPE:
            return adminleavetype.map((l) =>
                l._id === payload._id ? payload : l
            );
        case DELETE_LEAVE_TYPE:
            return adminleavetype.filter((admin) => admin._id !== payload);
        default:
            return adminleavetype;
    }
}
export default adminleave;