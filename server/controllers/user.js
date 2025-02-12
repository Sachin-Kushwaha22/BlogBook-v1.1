const USER = require("../models/user");
const bcrypt = require("bcrypt"); // Import bcrypt
const { setUser, getUser } = require("../service/auth");

async function handleUserSignUp(req, res) {
    const { firstname, lastname, age, email, username, password } = req.body;

    try {
        // Hash the password before saving it
        const saltRounds = 10; // Define the salt rounds
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Save user with hashed password
        await USER.create({
            firstname,
            lastname,
            age,
            email,
            username,
            password: hashedPassword
        });

        res.status(200).json({ "message": "Sign Up Successful !!" });
    } catch (error) {
        res.status(400).json({ "message": "Sign Up Failed", "error": error });
    }
}

async function handleUserSignIn(req, res) {
    const { username, password } = req.body;

    try {
        // Find user by username
        const user = await USER.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // Compare the provided password with the stored hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        // Generate token if password matches
        const token = setUser(user);
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            // maxAge: 60 * 60 * 1000, 
        });

        return res.json({ message: 'Login Successful! Token Created!' });
    } catch (error) {
        res.status(500).json({ message: "An error occurred during sign-in", error });
    }
}

async function handleUserLogout(req, res){
    try {
        const oauthToken = req.cookies?.oauthToken

        if (!oauthToken) {
            return res.status(401).json({ message: "Token not found, unauthorized", isSignOut: false });
        }

        //else
        res.clearCookie('oauthToken'); // If token is stored in cookies
        return res.status(200).json({ message: "Logged out successfully", isSignOut: true })


    } catch (error) {
        console.log('error from handleUserLogout func',error)
    }
}

module.exports = {
    handleUserSignUp,
    handleUserSignIn,
    handleUserLogout
};
