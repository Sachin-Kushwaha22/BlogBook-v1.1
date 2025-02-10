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
            const { name, picture } = admin.adminOAuthData;
            return res.status(200).json({ message: 'Admin Authorized', isAdmin: true , userData: { name, picture }})
        }

        return res.status(401).json({ message: 'Admin Unauthorized', isAdmin: false })

    } catch (error) {
        console.log('error from handleadminsignin server', error);
        return res.status(400).json({ message: "errro cause in server code" })
    }

}

async function handleAdminTokenVerify(req, res) {

    const adminAuthToken = req.cookies?.adminAuthToken

    if (!adminAuthToken) return res.status(401).json({ "message": "admin unauthorized", isAdmin: false })

    const check = getAdmin(adminAuthToken)
    if (!check) return res.status(401).json({ "message": "admin unauthorized !invalid token found", isAdmin: false })

    return res.status(200).json({ message: "Admin Authorized", isAdmin: true })
}

async function handleAdminLogout(req, res){
    const adminAuthToken = req.cookies?.adminAuthToken
    if(!adminAuthToken) return res.status(401).json({ "message": "admin unauthorized" })
    return res.clearCookie('adminAuthToken', { httpOnly: true, secure: true }).status(200).json({ message: 'Admin Logout Successfully'})
}

module.exports = {
    handleAdminSignin,
    handleAdminTokenVerify,
    handleAdminLogout
}