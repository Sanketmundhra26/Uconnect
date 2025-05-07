
import applicationError from '../error-handler/application-error.js';

export default class CommentModel {
    constructor(id,userId,postId,content){
        this.id= id;
        this.userId = userId;
        this.postId = postId;
        this.content = content;
    }

    static getAllComments(){
        return comments;
    }


    static createComment(newComment){
        comments.push(newComment);
        return newComment;
    }

    static deleteComment(id,userId,postId){
        const commentIndex = comments.findIndex((c)=> c.id === id && c.userId === userId && c.postId === postId);
        if(commentIndex == -1){
            return null;
        }else {
            const removeComment = comments.splice(commentIndex,1);
            return removeComment;
        }
    }

    static updateComment(id,userId,postId,newContent){
        const comment = comments.find((c)=> c.id === id && c.postId === postId && c.userId === userId);
        if(!comment){
            throw new applicationError("Comment not Fund",404);
        }else{
            comment.content = newContent;
            return comment;
        }
    }
}

let comments = [
    {
        id : 1,
        userId : 1,
        postId : 1,
        content : 'Comments content is here', 
    },
]