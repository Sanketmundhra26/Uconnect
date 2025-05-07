import { error } from "console";
import UserModel from "../User/user.model.js";
import applicationError from "../error-handler/application-error.js";

export default class PostModel {
    constructor(id,userId,caption,imageUrl){
        this.userId = userId;
        this.id = ++id;
        this.caption = caption;
        this.imageUrl = imageUrl;
    }

    static getAllPost(){
        return posts;
    }

    static getPostById(id){
        const post = posts.find((p) => p.id = id);
        return post;
    }

    static getPostByUserCreds(email,password){
        const user = UserModel.signIn(email,password);
        if(user) {
            return posts.filter((p) => 
            p.userId = user.userId);
        }else {
            throw new applicationError("Invalid User",400);
        }
    }

    static createPost(newPost){
            posts.push(newPost);
            return newPost;  
    }

    static deletePost(id,userId){
        const postIndex = posts.findIndex((p) => p.id == id && p.userId == userId);
        if(postIndex == -1){
            throw new applicationError("Post not Fund",404);
        }else {
            posts.splice(postIndex,1);
            return posts;
        }
    }

    static updatePost(id,userId,updatedData){
            const post = posts.find((p)=> p.id === id && p.userId === userId);
            if(!post){
                throw new applicationError("Post not Fund",404);
            }else {
                post.caption = updatedData.caption || post.caption;
                post.imageUrl = updatedData.imageUrl || post.imageUrl;
                return post;
            } 
    }
    
    //additional tasks

    static filterByCaption(caption) {
        return posts.filter(post => post.caption.toLowerCase().includes(caption.toLowerCase()));
    }


    static bookmarkPost(postId, userId) {
        const post = posts.find(p => p.id == postId);
        if (post) {
            if (!post.bookmarks) post.bookmarks = [];
            if (!post.bookmarks.includes(userId)) post.bookmarks.push(userId);
            return post;
        }
        return null;
    }


    static savePost(postId, userId, date) {
        const post = posts.find(p => p.id == postId);
        if (post) {
            if (!post.savedPosts) post.savedPosts = [];
            post.savedPosts.push({ userId, date });
            return post;
        }
        return null;
    }

}


let posts = [
    new PostModel(
        1,
        1,
        "Caption of the posts",
        'https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg',
    ),
]