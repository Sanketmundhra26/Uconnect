import UserModel from '../User/user.model.js';
import PostModel from '../PostOnline/postOnline.model.js';

export default class LikesModel{
    constructor(id,postId,userId){
        this.id = id;
        this.userId = userId;
        this.postId = postId;
    }

    static getAllLikes(postId){
        const all_Likes =  likes.filter((like) => like.postId === postId);
        return all_Likes;
    }

    static addLike(userId,postId){
        const existingLike = likes.find((like)=> like.userId === userId && like.postId === postId);
        if(existingLike){
            throw new applicationError("Already liked!",400);
        }else {
            const like = new LikesModel(LikesModel.currentId++,userId,postId);
            likes.push(like);
            return like;
        }
    }

    static removeLike(userId,postId){
        const likeIndex = likes.findIndex((like)=> like.userId === userId && like.postId === postId);
        if(likeIndex == -1 ){
            throw new applicationError("Error",404);
        } else {
            const removeLike = likes.splice(likeIndex,1);
            return removeLike;
        }
    }

    static toggleLike(userId,postId){
        const existingLike = likes.find((like) => like.userId === userId && like.postId === postId);
        if(existingLike){
            return this.removeLike(userId,postId);
        }else {
            return this.addLike(userId,postId);
        }
    }
}   

let likes = [];
let currentId = 1;