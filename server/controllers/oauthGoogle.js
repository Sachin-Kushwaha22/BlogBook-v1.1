const googleUsers = require('../models/oauthGoogle')
const { setUser, getUser } = require("../service/auth");

const handleSignInGoogle = async(req, res) => {
    const {user} = req.body
    // console.log('user data ', user);
    
    try {
        if (!user) {
            return res.json({message: 'Error in authentication, try again, error from handlesigningoogle controller'})
        }

        const isUser = await googleUsers.findOne({ "googleUserFullData.sub": user.sub })
        if (!isUser) {
            await googleUsers.create({
                googleUserFullData: user
            })
        }

        const oauthToken = setUser(user)
        res.cookie('oauthToken', oauthToken, {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000,
            secure: true
        })
        
        return res.status(200).json({message: 'Authentication Successful'})
        
    } catch (error) {
        return res.json({message: 'error from handlesigningoogle controller', error:'this is error'+ error})
    }
}

async function handleSignOutGoogle(req, res) {
    try {
        const oauthToken = req.cookies?.oauthToken

        if (!oauthToken) {
            return res.status(401).json({ message: "Token not found, unauthorized", isSignOut: false });
        }

        //else
        res.clearCookie('oauthToken'); // If token is stored in cookies
        return res.status(200).json({ message: "Logged out successfully", isSignOut: true })


    } catch (error) {
        console.log('error from handlesignoutgoogle func',error)
    }
}

module.exports = {
    handleSignInGoogle,
    handleSignOutGoogle,
}