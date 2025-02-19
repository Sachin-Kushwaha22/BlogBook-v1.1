const express = require('express')
const router = express.Router()

const { handleFollower, handleFollowerUnfollow, handleCheckFollower} = require('../controllers/followFeature')

router.route('/api/follow').post(handleFollower)
router.route('/api/unfollow').post(handleFollowerUnfollow)
router.route('/api/checkfollower').post(handleCheckFollower)

module.exports = router