const BLOG = require("../models/blog")

async function handleBlogPostDelete(req, res) {
    try {
        const user = req.userDetail
        const userid = user._id
        await BLOG.findByIdAndDelete({userid:userid})
        
    } catch (error) {
        
    }
}

module.exports = {
    handleBlogPostDelete,
}