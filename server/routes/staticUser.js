const express = require("express")
const router = express.Router()

router.route('/signin').get((req, res) => {
    return res.render('signin')
})
router.route('/signup').get((req, res) => {
    return res.render('signUp')
})

router.route('/').get((req, res) => {
    return res.render('home')
})
module.exports = router