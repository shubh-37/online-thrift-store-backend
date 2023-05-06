const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    uid: {
        type: String,
        unique: [true,  "Uid already exists!"],
        required: [true, "Please provide your uid!"],
        maxLength: [11,"Exceeding UID length!"]
    },
    email: {
        type: String,
        required: [true, "Please provide us with your email"],
        unique: [true, "Email already exists"],
        match: [/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'Please provide a valid email ID!']
    },
    phno: {
        type: Number,
        required: [true, "please provide your phone number"],
        unique: [true, "Phone number already exists"],
        maxLength: [10, "number maxlength exceeded"],
        match: []
    },
    hosteller: {
        type: Boolean,
        default: false,
        required: [true, "hosteller not mentioned"]
    }
})