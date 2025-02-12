const express = require("express")
const router = express.Router()
const { handleFeedback, handleFeedbackData } = require("../controllers/feedback")

router.route('/').post(handleFeedback)
router.route('/data').get(handleFeedbackData)

module.exports = router