const mongoose = require('mongoose')

const admin = new mongoose.Schema({
    adminOAuthData:{
        type: Object,
        required: true
    },
    adminkey:{
        type:String,
        // default: false,
        required: true
    }
},{timestamps:true})

const ADMIN = mongoose.model('admin', admin)

module.exports = ADMIN