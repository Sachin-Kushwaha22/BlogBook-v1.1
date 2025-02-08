const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    googleUserFullData:{
        type: Object,
        required: true
    },
    // isAdmin:{
    //     type:Boolean,
    //     default:false,
    //     required:true
    // },
    // isUser:{
    //     type:Boolean,
    //     default:true,
    // }
}, { timestamps: true })

const googleUsers = mongoose.model('googleUsers', userSchema)

module.exports = googleUsers