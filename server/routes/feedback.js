const express = require("express")
const router = express.Router()
const { handleFeedback } = require("../controllers/feedback")

router.route('/').post(handleFeedback)

module.exports = router