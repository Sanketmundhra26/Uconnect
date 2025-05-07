import express from 'express';
import CommentController from './comment.controller.js';

const commentRouter = express.Router();
const commentController = new CommentController();

commentRouter.get("/post/:postId", commentController.getAllComments);

commentRouter.post("/post/:postId", commentController.createComment);

commentRouter.delete("/:id", commentController.deleteComment);

commentRouter.put("/:id", commentController.updateComment);

export default commentRouter;

