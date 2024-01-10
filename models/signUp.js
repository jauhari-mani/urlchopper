const mongoose = require('mongoose');

const signUpSchema = new mongoose.Schema({
    firstName :{
        type: String,
        required: true
    },

    lastName: {
        type: String,
        required: true
    },

    email:{
        type: String,
        required: true
    },

    phoneNumber: {
        type: Number,
        required: true
    },

    password: {
        type: String,
        required: true
    }
})

module.exports = new mongoose.model('signUp' , signUpSchema)
