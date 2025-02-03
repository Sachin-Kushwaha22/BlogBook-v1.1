const { getUser } = require("../service/auth")

async function handleFrontendCheckAuth(req, res) {
    try {
        const token = req.cookies?.oauthToken
        
        if (!token) {
            return res.status(401).json({ message: "Unauthorized", isValid: false });
        }

        //else
        const user = await getUser(token)
        if (!user) {
            return res.status(401).json({ message: "Unauthorized", isValid: false });
        }
        //else
        return res.status(200).json({ message: "Authorized", isValid: true })


    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    handleFrontendCheckAuth,
}