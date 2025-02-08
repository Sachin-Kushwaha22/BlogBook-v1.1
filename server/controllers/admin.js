const ADMIN = require('../models/admin')
const { getAdmin, setAdmin } = require('../service/auth')


async function handleAdminSignin(req, res) {
    const { email, adminkey } = req.body

    try {
        const admin = await ADMIN.findOne({ 'adminOAuthData.email': email, adminkey: adminkey })

        if (admin) {
            // console.log('success', admin)
            // const profilePic = admin.adminOAuthData.picture
            const adminAuthToken = setAdmin(admin.adminOAuthData)
            res.cookie('adminAuthToken', adminAuthToken, {
                httpOnly: true,
                maxAge: 3600000,
                secure: true
            })
            return res.status(200).json({ 'message': 'Admin Authorized', 'isAdmin': true, 'userData': admin.adminOAuthData })
        }
        if (!admin) {
            
            return res.json({ 'message': 'Admin Unauthorized', isAdmin: false })
        }

    } catch (error) {
        console.log('error from handleadminsignin server', error);
    }

}

async function handleAdminTokenVerify(req, res) {

    const adminAuthToken = req.cookies?.adminAuthToken

    if (!adminAuthToken) return res.json({ "message": "admin unauthorized", isAdmin: false })

    const check = getAdmin(adminAuthToken)
    if(!check) return res.json({ "message": "admin unauthorized !invalid token found", isAdmin: false })

    return res.status(200).json({ message: "Admin Authorized", isAdmin: true})
}


module.exports = {
    handleAdminSignin,
    handleAdminTokenVerify
}