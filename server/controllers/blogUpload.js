const multer = require("multer")
const BLOG = require("../models/blog")
const BlogEditImages = require("../models/blogEditingImages")

// Configure Multer (in-memory storage or disk storage)
const storage = multer.memoryStorage(); // For storing the file in memory
const upload = multer({ storage });

async function handleBlogUpload(req, res){
    try {
        const { buffer, mimetype, originalname } = req.file;

        // Save image in MongoDB
        const image = new BlogEditImages({
            filename: originalname,
            data: buffer,
            contentType: mimetype,
        });

        const savedImage = await image.save();

        // Send back the image URL or ID
        res.json({ imageUrl: `/images/${savedImage._id}` });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Image upload failed.' });
    }
}
async function handleUploadedImage(req, res){
    try {
        const image = await BlogEditImages.findById(req.params.id);
        if (image) {
            res.set('Content-Type', image.contentType);
            res.send(image.data);
        } else {
            res.status(404).send('Image not found');
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch the image.' });
    }
}

module.exports = {
    upload,
    handleBlogUpload,
    handleUploadedImage,
}