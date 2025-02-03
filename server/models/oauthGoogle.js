const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    googleUserFullData:{
        type: Object,
        required: true
    }
}, { timestamps: true })

const googleUsers = mongoose.model('googleUsers', userSchema)

module.exports = googleUsers