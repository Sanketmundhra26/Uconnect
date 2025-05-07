import LikesModel from '../Likes/Likes.Model.js'

export default class LikeController {

    retrieveLikes(req,res){
        const {postId} = req.params
        const likes = LikesModel.getAllLikes(parseInt(postId));
        res.status(200).json({postId, likes});
    }

    toggleLike(req,res){
        const {postId} = req.params;
        const userId = req.userId;
        const result = LikesModel.toggleLike(userId,parseInt(postId));
        if(result){
            res.status(200).json({message : result.id ? "like added" : "like removed" , result});
        } else {
            res.status(500).json({message: "Failed to toggle like"});
        }
    }
}