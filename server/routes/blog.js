const express = require("express")
const router = express.Router()
const { handleBlogPost,
    handleViewBlogPost,
    handleViewBlogPostId,
    handleBlogPostAnalytics,
    handleBlogComments,
    handleGetBlogComments,
    handleGetAllBlogComments,
    handleDeletedBlog,
    handleViewCount,
    handleDeleteComments,
} = require("../controllers/blog")

const { upload,
    handleBlogUpload,
    handleUploadedImage,
} = require("../controllers/blogUpload")

router.route('/blog').post(handleBlogPost)
router.route('/viewblog').get(handleViewBlogPost)
router.route('/user/viewblog').post(handleBlogPostAnalytics)
router.route('/viewblog/:id').get(handleViewBlogPostId)
router.route('/viewblog/viewCount/:id').get(handleViewCount)
router.route('/delete/blog/:id').post(handleDeletedBlog)
router.route('/delete/blogcomment/:id').post(handleDeleteComments)
router.route('/viewblog/:id/comments').post(handleBlogComments)
router.route('/viewblog/:id/comments').get(handleGetBlogComments)
router.route('/viewblog/comments').post(handleGetAllBlogComments)

router.post('/uploadblog', upload.single('image'), handleBlogUpload);
router.get('/images/:id', handleUploadedImage);

module.exports = router