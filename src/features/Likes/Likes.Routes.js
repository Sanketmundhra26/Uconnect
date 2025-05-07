import express from 'express';
import LikeController from './Likes.Controller.js';

const likeRouter = express.Router();
const likeController = new LikeController();

likeRouter.get("/:postId",likeController.retrieveLikes);

likeRouter.get("/toggle/:postId",likeController.toggleLike);

export default likeRouter;
