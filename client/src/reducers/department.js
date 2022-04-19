import { ADD_DEPARTMENT, DELETE_DEPARTMENT, UPDATE_DEPARTMENT, GET_DEPARTMENT } from "../actions/department/type";

function department(department = [], action) {
    const { type, payload } = action;
    switch (type) {
        case GET_DEPARTMENT:
            return payload;
        case ADD_DEPARTMENT:
            return [payload, ...department]
        case UPDATE_DEPARTMENT:
            return department.map((l) =>
                l._id === payload._id ? payload : l
            );
        case DELETE_DEPARTMENT:
            return department.filter((admin) => admin._id !== payload);
        default:
            return department;
    }
}
export default department;