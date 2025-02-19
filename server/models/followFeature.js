const mongoose = require('mongoose')

const followFeatureSchema = new mongoose.Schema({

    authorId:{
        type:String,
        required:true,
    },
    followerId:{
        type:String,
        required:true
    },
    isFollowing:{
        type:Boolean,
        required:true,
        default: false,
    }

},{ timestamps:true})

const FOLLOW = mongoose.model('followFeature', followFeatureSchema)

module.exports = FOLLOW