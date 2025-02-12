const express = require("express")
const router = express.Router()
const { handleUserSignUp, handleUserSignIn, handleUserLogout} = require("../controllers/user")
const { handleFrontendCheckAuth  } = require("../controllers/userAuth")
const { handleLogout  } = require("../controllers/logout")
const { handleAnalytics  } = require("../controllers/analytics")

router.route('/signin').post(handleUserSignIn)
router.route('/signup').post(handleUserSignUp)
router.route('/api/checkAuth').get(handleFrontendCheckAuth)
router.route('/api/logout').post(handleUserLogout)
router.route('/api/analytics').post(handleAnalytics)

module.exports = router