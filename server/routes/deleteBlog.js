const express = require("express")
const { handleBlogPostDelete } = require("../controllers/blogDelete")
const router = express.Router()

router.route('/delete').post(handleBlogPostDelete)

module.exports = router