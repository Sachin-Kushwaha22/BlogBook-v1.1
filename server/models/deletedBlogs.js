const mongoose = require("mongoose")

const deletedBlogScheme = new mongoose.Schema({
    deletedblogData:{
        type: Object,
        required: true,
    }
}, { timestamps: true })

const DELETEDBLOG = mongoose.model("deletedBlogData", deletedBlogScheme)

module.exports = DELETEDBLOG