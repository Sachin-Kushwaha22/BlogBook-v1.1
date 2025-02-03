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

module.exports = {
    handleFeedback,
}