const express = require('express')
const router = express.Router()

const { handleSignInGoogle, handleSignOutGoogle } = require('../controllers/oauthGoogle')

router.route('/signin').post(handleSignInGoogle)
router.route('/signout').post(handleSignOutGoogle)

module.exports = router