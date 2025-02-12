const BLOG = require("../models/blog")
const USER = require("../models/user")
const googleUsers = require('../models/oauthGoogle')
const COMMENTS = require('../models/blogComments')

async function handleBlogPost(req, res) {

    const { userid, personalDetail, title, content, } = req.body

    try {
        await BLOG.create({
            userid: userid,
            name: personalDetail.fullname,
            purpose: personalDetail.purpose,
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
    if (!blogs) return res.status(404).json({ message: 'Data not found' })
    return res.status(200).json(blogs)
}

async function handleViewBlogPostId(req, res) {
    try {
        const { id } = req.params
        const blog = await BLOG.findById(id)
        return res.status(200).json(blog)
    } catch (error) {
        console.log('error from handleviewblogpostid', error);

    }
}

async function handleBlogPostAnalytics(req, res) {
    const { userid } = req.body
    const blogs = await BLOG.find({ userid: userid }).sort({ updatedAt: -1 })

    if (!blogs) return res.status(404).json({ message: 'Data Not Found' })

    return res.status(200).json(blogs)
}

async function handleBlogComments(req, res) {
    const { id } = req.params;
    const { senderId, senderName, comments } = req.body

    if (id && senderId && senderName && comments) {
        const blog = await BLOG.findById(id)
        if (!blog) return res.status(404).json({ message: 'Blog Not Found' })
        const AutherId = blog.userid;

        try {
            const commentSave = await COMMENTS.create({
                blogId: id,
                authorId: AutherId,
                senderId: senderId,
                senderName: senderName,
                comments: comments
            })

            if (!commentSave) return res.status(400).json({ message: 'Data Not Saved In DataBase' })

            return res.status(200).json({ message: 'Comments Data Successfully Stored' })
        } catch (error) {

        }
    } else return res.status(400).json({ message: 'Data Not Found or Invalid Data' })



}

module.exports = {
    handleBlogPost,
    handleViewBlogPost,
    handleViewBlogPostId,
    handleBlogPostAnalytics,
    handleBlogComments
}