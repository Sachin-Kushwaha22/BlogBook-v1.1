const express = require("express")
const router = express.Router()
const { handleBlogPost,
    handleViewBlogPost,
    handleViewBlogPostId,
} = require("../controllers/blog")

const { upload,
     handleBlogUpload,
    handleUploadedImage,
} = require("../controllers/blogUpload")

router.route('/blog').post(handleBlogPost)
router.route('/viewblog').get(handleViewBlogPost)
router.route('/viewblog/:id').get(handleViewBlogPostId)

router.post('/uploadblog', upload.single('image'), handleBlogUpload);
router.get('/images/:id', handleUploadedImage);

module.exports = router