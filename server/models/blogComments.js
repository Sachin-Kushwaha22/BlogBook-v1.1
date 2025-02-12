const mongoose = require('mongoose')

const blogComments = new mongoose.Schema({
    blogId: {
        type: String,
        required: true
    },
    authorId:{
        type:String,
        required:true
    },
    senderId:{
        type:String,
        required:true
    },
    senderName:{
        type:String,
        required:true
    },
    comments:{
        type:String,
        required:true
    }
},{ timestamps:true})

const COMMENTS = mongoose.model('blogComments', blogComments)

module.exports = COMMENTS