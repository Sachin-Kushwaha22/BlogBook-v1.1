const mongoose = require('mongoose')
const { applyTimestamps } = require('./user')

const imageSchema = new mongoose.Schema({
    filename: String,
    data: Buffer,
    contentType: String,
},{timestamps:true})

const BlogEditImages = mongoose.model('blogeditimage', imageSchema)

module.exports = BlogEditImages