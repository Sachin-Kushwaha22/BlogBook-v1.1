const jwt = require("jsonwebtoken")
const secret = process.env.SECRET_KEY

function setUser(user){
    const payload = {
        _id: user.sub,
        name: user.name,
        email: user.email,
    }

    return jwt.sign(payload, secret)
}

function getUser(token){
    if(!token) return null
    // console.log(jwt.verify(token, secret));
    
    return jwt.verify(token, secret) 
}

module.exports = {
    setUser,
    getUser,
}