const express = require("express");
const router = express.Router();

const {handleAdminSignin, handleAdminTokenVerify, handleAdminLogout} = require('../controllers/admin')
// Example route (adjust as per your needs)
router.route('/auth').post(handleAdminSignin)
router.route('/auth/api/check').get(handleAdminTokenVerify)
router.route('/logout').post(handleAdminLogout)
module.exports = router;