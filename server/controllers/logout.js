const { getUser } = require("../service/auth")

async function handleLogout(req, res) {
    try {
        const token = req.cookies?.token

        if (!token) {
            return res.status(401).json({ message: "Token not found, unauthorized", isLogout: false });
        }

        //else
        res.clearCookie('token'); // If token is stored in cookies
        return res.status(200).json({ message: "Logged out successfully", isLogout: true })


    } catch (error) {
        console.log('error from handlelogout func',error)
    }
}

module.exports = {
    handleLogout,
}