import PostController from "./postOnline.controller.js";
import express from 'express';
import uploadFile from "../Middleware/fileUpload.middleware.js";

const postRouter = express.Router();
const postController = new PostController();

postRouter.get('/all',postController.getAllPost);

postRouter.get('/:id',postController.getPostById);

postRouter.get('/user-posts',postController.getPostByUserCreds);

postRouter.post('/',uploadFile.single('imageUrl'),postController.createPost)

postRouter.post('/:id',postController.deletePost);

postRouter.put('/:id',uploadFile.single('imageUrl'),postController.updatePost);

//Additional Tasks : 

// Filter posts by caption
postRouter.get('/filter', postController.filterPostsByCaption);

// Bookmark a post
postRouter.post('/bookmark/:id', postController.bookmarkPost);

// Save post engagement with date
postRouter.post('/save/:id', postController.savePost);

export default postRouter;

