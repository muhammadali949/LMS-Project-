const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const UserRequest = require("../models/UserRequest.js");




// @route   POST /userRequest
// @desc    userRequest
// @access  Private
router.post('/request', [
    check("leaveDate", "Date is required").not().isEmpty(),
    check("leaveCategory", "Category is required").not().isEmpty(),
    check(
        "leaveDescription",
        "leaveCategory is required"
    ),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const user = req.body;
    const leaveDate = req.body.leaveDate;
    const newUser = new UserRequest(user);
    try {
        let user = await UserRequest.findOne({ leaveDate });

        if (user) {
            res.status(400).json({ errors: [{ msg: "your leave request has been send" }] });
        } else {
            await newUser.save()
            res.json(newUser);
        }

    } catch (error) {
        res.json({ message: error.message })
    }
})
// @route   get /userRequest
// @desc    Get all
// @access  Private
router.get('/request', async (req, res) => {

    try {
        let userReq = await UserRequest.find()
        res.json(userReq);
    } catch (error) {
        res.json({ message: error.message })
    }
})
// @route   get /userRequest
// @desc    Get Login user
// @access  Private
router.get('/request/:id', async (req, res) => {

    // const id = req.params.id;
    try {
        const userReq = await UserRequest.findById("61bb8135828a4abc96dc9a1c")
        res.json(userReq);
    } catch (error) {
        res.json({ message: error.message })
    }
})

// @route   Update /users/userRequest
// @desc    Get user by id
// @access  Private
router.put('/request/:id', async (req, res) => {

    const user = req.body;
    console.log(user)
    const editUser = new UserRequest(user);
    try {
        await UserRequest.updateOne({ _id: req.params.id }, editUser)
        res.json(editUser)

    } catch (error) {
        res.json({ message: error.message })
    }
})
// @route   Delete /User Request
// @desc    Get user by id
// @access  Private
router.delete('/request/:id', async (req, res) => {

    try {
        await UserRequest.deleteOne({ _id: req.params.id })
        res.json("User Deleted Successfully")

    } catch (error) {
        res.json({ message: error.message })
    }
})
module.exports = router;
