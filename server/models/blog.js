const mongoose = require("mongoose")

const blogScheme = new mongoose.Schema({
    userid:{
        type:String,
        required:true,
    }, 
    userPicture:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    instagram:{
        type: String,
        
    },
    linkedin:{
        type: String,
        
    },
    twitter:{
        type: String,
        
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    views:{
        type: Number,
        default: 0,
    },


}, { timestamps: true })

const BLOG = mongoose.model("blogData", blogScheme)

module.exports = BLOG