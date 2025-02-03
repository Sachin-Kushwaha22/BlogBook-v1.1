const mongoose = require('mongoose')


const feedbackSchema = new mongoose.Schema({
    userid:{
        type:String,
        required:true,
    },
    feedback: {
        type: String,
        required: true,
    },
}, { timestamps: true })

const FEEDBACK = mongoose.model("feedback", feedbackSchema)

module.exports = FEEDBACK