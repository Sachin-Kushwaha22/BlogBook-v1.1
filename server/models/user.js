/*
    - import mongoose
    - create schema (userSchema = new mongoose.Schema({},{}))
    - create model (USER = mongoose.model("<name>", userSchema))
*/

const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    }
}, { timestamps: true })

const USER = mongoose.model('practiseuser', userSchema)

module.exports = USER