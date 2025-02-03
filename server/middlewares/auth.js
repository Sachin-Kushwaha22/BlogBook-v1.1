const { getUser } = require("../service/auth")

async function restrictUserLogin(req, res, next) {
    const userToken = req.cookies?.oauthToken

    if (!userToken) return res.status(401).json({message:"Unauthorized"})

    const userDetail = getUser(userToken)
    if (!userDetail) return res.status(401).json({message:"Unauthorized"})
    req.userDetail = userDetail
    next()
}

async function checkauth(req, res, next) {
    const userToken = req.cookies?.oauthToken
    const userDetail = getUser(userToken)
    req.userDetail = userDetail
    
    next()
}

async function handleFrontendCheckAuth(req, res) {
    try {
        const token = req.cookies?.token
        // console.log(token);
        
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
    restrictUserLogin,
    checkauth,
    handleFrontendCheckAuth,
}