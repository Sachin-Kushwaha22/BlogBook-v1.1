const mongoose = require("mongoose")

const blogScheme = new mongoose.Schema({
    userid:{
        type:String,
        required:true,
    }, 
    name:{
        type:String,
        required:true,
    },
    purpose:{
        type:String,
        required:true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },

}, { timestamps: true })

const BLOG = mongoose.model("blogData", blogScheme)

module.exports = BLOG