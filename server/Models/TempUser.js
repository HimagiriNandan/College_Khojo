const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    otp:{
        type : Number,
        required : true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


// Create the User model from the schema and export it
const User =  mongoose.model('TempUser', userSchema);

module.exports = User;