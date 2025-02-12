const FEEDBACK = require("../models/feedback")

async function handleFeedback(req, res) {
    const {userid, feedback} = req.body

    await FEEDBACK.create({
        userid: userid,
        feedback: feedback
    })
    return res.status(200).json({
        "message": "Feedback submitted successfully"
    })
}

async function handleFeedbackData(req, res){
    const feedback = await FEEDBACK.find({}).sort({ updatedAt: -1 })

    if(!feedback) return res.status(404).json({ message:'No Data Found'})

    return res.status(200).json(feedback)
 }

module.exports = {
    handleFeedback,
    handleFeedbackData
}