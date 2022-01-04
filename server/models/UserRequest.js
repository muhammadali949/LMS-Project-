const mongoose = require("mongoose");

const UserRequestSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    leaveDate: {
        type: Date,
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
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = UserRequest = mongoose.model("userrequest", UserRequestSchema);