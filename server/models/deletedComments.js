const mongoose = require("mongoose")

const deletedCommentScheme = new mongoose.Schema({
    deletedCommentData:{
        type: Object,
        required: true,
    }
}, { timestamps: true })

const DELETEDCOMMENTS = mongoose.model("deletedCommentData", deletedCommentScheme)

module.exports = DELETEDCOMMENTS