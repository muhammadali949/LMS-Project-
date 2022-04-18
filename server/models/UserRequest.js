const mongoose = require("mongoose");

const UserRequestSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    employee: {
        type: String,
    },
    gender: {
        type: String,
    },
    phoneNo: {
        type: String,
    },
    email: {
        type: String,
    },
    adminRemark: {
        type: String,
        default: 'Pending',

    },
    adminActionDate: {
        type: String,
        default: ''
    },
    leaveDate: {
        type: String,
        required: true
    },
    leaveCategory: {
        type: String,
        required: true
    },
    leaveDescription: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'Pending',
    },
    userid: {
        type: String,
        required: true,
    },
    manager: {
        type: String,
    },
    joinDate: {
        type: Date,
        required: true,

    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = UserRequest = mongoose.model("userrequest", UserRequestSchema);