const mongoose = require('mongoose')

const adminOauthUser = new mongoose.Schema({
    adminOAuthUser:{
        type: Object,
        required: true
    },
    isAdmin:{
        type:Boolean,
        default: false,
        required: true
    },
    isUser:{
        type:Boolean,
        default: true,
        required: true
    }
},{timestamps:true})

const ADMINUSER = mongoose.model('oauthAdminUser', adminOauthUser)

module.exports = ADMINUSER