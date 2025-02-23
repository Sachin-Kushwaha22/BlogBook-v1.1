const express = require('express')
const router = express.Router()

const { handleFollower, handleFollowerUnfollow, handleCheckFollower, handleGetFollowerDetail} = require('../controllers/followFeature')

router.route('/api/follow').post(handleFollower)
router.route('/api/unfollow').post(handleFollowerUnfollow)
router.route('/api/checkfollower').post(handleCheckFollower)
router.route('/api/getfollower/:id').get(handleGetFollowerDetail)

module.exports = router