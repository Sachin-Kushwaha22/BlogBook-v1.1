const FOLLOW = require('../models/followFeature')

const handleFollower = async(req, res) => {

    const { authorId, followerId } = req.body

    try {
        if(authorId === followerId) {
            return res.status(400).json({ message: "You can't follow yourself" })
        }

        const isExist = await FOLLOW.findOne({
            authorId: authorId,
            followerId: followerId
        })

        if(!isExist){
            const setFollower = await FOLLOW.create({
                authorId: authorId,
                followerId: followerId,
                isFollowing: true
            })
    
            if(!setFollower) return res.status(400).json({ message : 'Data Not saved'})
    
            return res.status(200).json({ message: 'Follower Data saved correctly'})
        }

        if(!isExist.isFollowing){
            isExist.isFollowing = true
            await isExist.save()
            return res.status(200).json({ message: 'Follower Data Saved '})
        }
        
        return res.status(400).json({ message : 'Already Following'})
        
    } catch (error) {
        console.log('error occur on handlefollower func server', error.response?.data?.message || error.message)
    }
}

const handleFollowerUnfollow = async(req, res) => {
    const { authorId, followerId } = req.body

    try {
        const unfollow = await FOLLOW.findOne({ authorId: authorId , followerId: followerId})
        if(!unfollow) return res.status(400).json({ message : 'Data Not found'})
        
        if(unfollow.isFollowing){
            unfollow.isFollowing = false
            await unfollow.save()
            return res.status(200).json({ message: 'Unfollowed'})
        }

        return res.status(400).json({ message: ' already following'})
    } catch (error) {
        
    }
}

const handleCheckFollower = async(req, res) => {
    const { authorId, followerId } = req.body
    
    try {
        const isFollow = await FOLLOW.findOne({ authorId: authorId , followerId: followerId })
        if(!isFollow) return res.status(200).json({ isFollowing:false })
        
        if(isFollow.isFollowing){
            return res.status(200).json({ isFollowing:true})
        }else{
            return res.status(200).json({ isFollowing:false})
        }

    } catch (error) {
        console.log('error from followerStatus func client :', error.response?.data?.message || error.message);
    }
}

const handleGetFollowerDetail = async(req, res) => {
    const { id } = req.params

    try {
        const followerDetail = await FOLLOW.find({ authorId: id, isFollowing: true }).sort({ updatedAt: -1})
        if(!followerDetail) return res.status(404).json({ message: 'Data Not found'})

        const followingDetail = await FOLLOW.find({ followerId: id, isFollowing: true }).sort({ updatedAt: -1})
        if(!followingDetail) return res.status(404).json({ message: 'Data Not found'})

        
        return res.status(200).json({ followerDetail, followingDetail})

    } catch (error) {
        console.log('error from handlegetfollowerdetail', error);
    }
}

module.exports={
    handleFollower,
    handleFollowerUnfollow,
    handleCheckFollower,
    handleGetFollowerDetail,
}