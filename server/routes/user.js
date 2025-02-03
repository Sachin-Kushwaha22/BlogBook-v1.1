const express = require("express")
const router = express.Router()
const { handleUserSignUp, handleUserSignIn, } = require("../controllers/user")
const { handleFrontendCheckAuth  } = require("../controllers/userAuth")
const { handleLogout  } = require("../controllers/logout")
const { handleAnalytics  } = require("../controllers/analytics")

router.route('/signin').post(handleUserSignIn)
router.route('/signup').post(handleUserSignUp)
router.route('/api/checkAuth').post(handleFrontendCheckAuth)

router.route('/api/analytics').post(handleAnalytics)

module.exports = router