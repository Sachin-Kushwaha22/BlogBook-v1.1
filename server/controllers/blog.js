const BLOG = require("../models/blog")
const USER = require("../models/user")
const googleUsers = require('../models/oauthGoogle')

async function handleBlogPost(req, res) {

    const { userid, personalDetail, title, content, } = req.body

    try {
        await BLOG.create({
            userid:userid,
            name: personalDetail.fullname,
            purpose:personalDetail.purpose,
            title,
            description: content,
        });
        res.status(200).json({ 'message': 'blog saved successfully', 'status': 200 });
    } catch (error) {
        console.error("Validation Error error from handleBlogPost backend:", error);
        return res.status(400).send("Validation Error error from handleBlogPost backend: " + error.message);
    }
}

async function handleViewBlogPost(req, res) {
    const blogs = await BLOG.find({}).sort({ createdAt: -1 })
    res.json(blogs)
}

async function handleViewBlogPostId(req, res) {
    const { id } = req.params
    const blog = await BLOG.findById(id)
    res.json(blog)
}

async function handleBlogPostAnalytics(req, res){

}

module.exports = {
    handleBlogPost,
    handleViewBlogPost,
    handleViewBlogPostId,
    handleBlogPostAnalytics,
}