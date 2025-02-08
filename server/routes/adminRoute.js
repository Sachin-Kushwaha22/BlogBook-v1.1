const express = require("express");
const router = express.Router();

const {handleAdminSignin, handleAdminTokenVerify} = require('../controllers/admin')
// Example route (adjust as per your needs)
router.route('/auth').post(handleAdminSignin)
router.route('/auth/api/check').post(handleAdminTokenVerify)
module.exports = router;