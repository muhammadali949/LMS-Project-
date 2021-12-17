const mongoose = require("mongoose");

const UserRequestSchema = new mongoose.Schema({
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
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = UserRequest = mongoose.model("userrequest", UserRequestSchema);