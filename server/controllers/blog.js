const BLOG = require("../models/blog")
const USER = require("../models/user")
const googleUsers = require('../models/oauthGoogle')
const COMMENTS = require('../models/blogComments')
const DELETEDBLOG = require('../models/deletedBlogs')
const DELETEDCOMMENTS = require('../models/deletedComments')
const requestIp = require('request-ip')

async function handleBlogPost(req, res) {

    const { userid, userPicture, personalDetail, title, content, } = req.body
    console.log(personalDetail);

    try {
        await BLOG.create({
            userid: userid,
            userPicture: userPicture,
            name: personalDetail.fullname,
            instagram: personalDetail.instagram,
            linkedin: personalDetail.linkedin,
            twitter: personalDetail.twitter,
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

        if (!blog) return res.status(404).json({ message: "Blog not found" });

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
    const { senderId, senderName, senderPicture, comments } = req.body

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
                senderPicture: senderPicture,
                comments: comments
            })


            if (commentSave) {
                const commentFullData = await COMMENTS.findOne({
                    blogId: id,
                    authorId: AutherId,
                    senderId: senderId,
                    senderName: senderName,
                    comments: comments
                })

                return res.status(200).json(commentFullData)
            }


            // return res.status(400).json({ message: 'Data Not Saved In DataBase' })

        } catch (error) {

        }
    } else return res.status(400).json({ message: 'Data Not Found or Invalid Data' })

}

const handleGetBlogComments = async (req, res) => {
    const { id } = req.params

    try {
        const commentData = await COMMENTS.find({ blogId: id }).sort({ updatedAt: -1 })

        if (commentData) return res.status(200).json(commentData)

        return res.status(404).json({ message: 'No Comment Data found from Database' })

    } catch (error) {
        console.log("error from handlegetblogcomments func backend", error.response?.data?.message || error.message);
    }
}

const handleGetAllBlogComments = async (req, res) => {
    const { AuthorId } = req.body

    try {
        const commentData = await COMMENTS.find({ authorId: AuthorId }).sort({ updatedAt: -1 })

        if (commentData) return res.status(200).json(commentData)

        return res.status(404).json({ message: 'No Comment Data found from Database' })

    } catch (error) {
        console.log("error from handlegetblogcomments func backend", error.response?.data?.message || error.message);
    }
}

const handleDeletedBlog = async (req, res) => {
    const { id } = req.params

    try {
        // console.log("Heere", urlid);
        const blog = await BLOG.findById(id)
        // console.log(blog);

        if (!blog) {
            return res.status(404).json({ message: 'Blog Not Found' })
        }
        // const {_id, userid, userPicture, name, instagram, linkedin, twitter, title, description} = blog

        const deletedBlog = await DELETEDBLOG.create({
            deletedblogData: blog
        })

        if (!deletedBlog) {
            return res.status(404).json({ message: 'Blog Not Found' })
        }

        const comment = await COMMENTS.find({ blogId: id })

        if (!comment) return res.status(404).json({ message: 'comment for specific blog not found' })

        await DELETEDCOMMENTS.create({
            deletedCommentData: comment
        })

        const deleteBlogComments = await COMMENTS.deleteMany({ blogId: id });

        if (!deleteBlogComments) {

            return res.status(400).json({ message: 'Error While Deleting ! Try Again' })
        }


        await BLOG.findByIdAndDelete(id).then(() => {
            return res.status(200).json({ message: 'Blog Deleted Successfully' })
        })

    } catch (error) {
        console.log('Error from handleDeletedBlog func', error.response?.data?.message || error.message);
    }
}

const handleDeleteComments = async (req, res) => {
    const { commentId } = req.body
    const { id } = req.params

    try {
        const commentData = await COMMENTS.find({ blogId: id })
        if (!commentData) return res.status(404).json({ message: 'Comment Not found'})

        const comment = await COMMENTS.findByIdAndDelete(commentId)
        if (!comment) return res.status(400).json({ message: 'error while deleting comment' })



        return res.status(200).json({ message: 'Comment Deleted' , commentData:commentData })

    } catch (error) {
        console.log('error from handleDeleteComment func server :', error.response?.data?.message || error.message);
    }
}

const handleViewCount = async (req, res) => {
    try {
        const { id } = req.params

        const blog = await BLOG.findByIdAndUpdate(
            id,
            { $inc: { views: 1 } }, // Atomic increment
            { new: true } // Return updated document
        );

        if (!blog) return res.status(404).json({ message: "Blog not found" });


        return res.status(200).json({  })
    } catch (error) {
        console.log('error from handleViewCount', error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
module.exports = {
    handleBlogPost,
    handleViewBlogPost,
    handleViewBlogPostId,
    handleBlogPostAnalytics,
    handleBlogComments,
    handleGetBlogComments,
    handleGetAllBlogComments,
    handleDeletedBlog,
    handleDeleteComments,
    handleViewCount,
}