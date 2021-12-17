const express = require("express");
const router = express.Router();
const leavetype = require("../models/LeaveTypes");




// @route   POST /LeaveTypes
// @desc    Leave Type and number
// @access  Private
router.post('/leave', async (req, res) => {

    const leave = req.body;
    const lType = req.body.leaveType;
    console.log(lType)
    const newLeaveType = new leavetype(leave);
    try {
        let userLeave = await leavetype.findOne({ leaveType: lType });
        console.log(userLeave)
        if (userLeave) {
            res.status(400).json({ errors: [{ msg: "This Type Already Decleared" }] });
        } else {
            await newLeaveType.save()
            res.json(newLeaveType);
        }

    } catch (error) {
        res.json({ message: error.message })
    }
})
// @route   get /Leave
// @desc    Get all
// @access  Public
router.get('/leave', async (req, res) => {

    try {
        let LeaveAll = await leavetype.find()
        res.json(LeaveAll);
    } catch (error) {
        res.json({ message: error.message })
    }
})


// @route   Update /Leave
// @desc    Get user by id
// @access  Private
router.put('/leave/:id', async (req, res) => {

    const leaveData = req.body;
    const editLeave = new leavetype(leaveData);
    try {
        await editLeave.updateOne({ _id: '61bc72328f59376c7ec50f51' }, editLeave)
        res.json(editLeave)

    } catch (error) {
        res.json({ message: error.message })
    }
})
// @route   Delete /Leave
// @desc    Get user by id
// @access  Private
router.delete('/leave/:id', async (req, res) => {

    try {

        await leavetype.deleteOne({ _id: '61bc7945e73e5af84c00936e' })
        res.json("User Deleted Successfully")

    } catch (error) {
        res.json({ message: error.message })
    }
})


module.exports = router;
