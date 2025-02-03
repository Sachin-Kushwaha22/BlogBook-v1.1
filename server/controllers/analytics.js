const { getUser } = require("../service/auth")
const BLOG = require("../models/blog")

async function handleAnalytics(req, res) {
    try {
        const token = req.cookies?.token
        if (!token) {
            return res.status(401).json({ message: "Token not found, unauthorized", isLogout: false });
        }
        const user = getUser(token)
        // console.log('helo',user._id);
        
        const analytics = await BLOG.find({userid:user._id})
        console.log(analytics);
        return res.status(200).json({ blogPost:analytics,valid:true, message:'Analytics response received'})
        

    } catch (error) {
        console.log('error from handlelogout func',error)
    }
}

module.exports = {
    handleAnalytics,
}