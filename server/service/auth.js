const jwt = require("jsonwebtoken")
const secret = process.env.SECRET_KEY
const adminSecret = process.env.ADMIN_SECRET_KEY

function setUser(user){
    const payload = {
        _id: user.sub,
        name: user.name,
    }

    return jwt.sign(payload, secret)
}

function getUser(token){
    if(!token) return null
    // console.log(jwt.verify(token, secret));
    
    return jwt.verify(token, secret) 
}
function setAdmin(admin){
    const payload = {
        _id: admin.sub,
        name: admin.name,
    }

    return jwt.sign(payload, adminSecret)
}

function getAdmin(adminAuthToken){
    if(!adminAuthToken) return null
    // console.log(jwt.verify(token, secret));
    
    return jwt.verify(adminAuthToken, adminSecret) 
}

module.exports = {
    setUser,
    getUser,
    setAdmin,
    getAdmin
}