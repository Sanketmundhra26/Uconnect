import CommentModel from "./comment.model.js";


export default class CommentController{

    getAllComments(req,res){
        const comments = CommentModel.getAllComments();
        res.status(200).send(comments);
    }

    createComment(req,res){
        const id = req.params.id;
        const content = req.body;
        const newComment = {
            id,
            content,
        };
        const createNewComment =  CommentModel.createComment(newComment);
        res.status(200).send(createNewComment);
    }

    deleteComment(req,res){
        const id = req.params.id;
        const userId = req.userId;
        const postId = req.params.postId;
        const error = CommentModel.removeComment(id,userId,postId);
        if(error){
            res.status(401).send("No resource found");
        }else {
            res.status(200).send("deleted successfully");
        }
    }

    updateComment(req,res){
        const id = req.params.id;
        const userId = req.userId;
        const postId = req.params.postId;
        const {newContent} = req.body;
        const updatedComment = CommentModel.updateComment(parseInt(id),userId,parseInt(postId),newContent);
        if(!updatedComment){
            res.status(404).json({message: "Comment Not found or user unauthorized"});
        }else { 
            res.status(200).json({message: " comment updated successfully", updatedComment});
        }
    }
}