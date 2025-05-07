import PostModel from "./postOnline.model.js";


export default class PostController {

    getAllPost(req,res){
        const posts = PostModel.getAllPost();
        res.status(200).send(posts);
    }

    getPostById(req,res){
        const id = req.params.id;
        const post = PostModel.getPostById(id);
        if(!post){
             res.status(404).send("Post not found");
        }else {
            return res.status(200).send(post);
        }
    }

    getPostByUserCreds(req,res){
        const {email,password} = req.body;
        const userPosts = PostModel.getPostByUserCreds(email,password);
        if(userPosts){
            res.status(200).send(userPosts);
        }else {
            res.status(401).send("No posts found");
        }
    }

    createPost(req,res){
        const id = req.params.id;
        const {caption,imageUrl} = req.body;
        const newPost = {
            id,
            caption,
            imageUrl : req.file.filename,
        };
        const createNewPost = PostModel.createPost(newPost);
        res.status(201).send(createNewPost);
    }

    deletePost(req,res){
        const id = req.params.id;
        const userId = req.userId; //Payload.userId (jwttoken)
        const error = PostModel.deletePost(id,userId);
        if(error){
            res.status(404).send(error);
        }else {
            res.status(200).send("Deleted successfully");
        }
    }

    updatePost(req,res){
        const userId = req.userId;
        const id = req.params.id;
        const caption = req.body.caption;
        const imageUrl = req.file? `/uploads/${req.file.filename}`:undefined;
        const updatedPost = PostModel.updatePost(parseInt(id),userId,{caption,imageUrl});
        if(!updatedPost){
            return res.status(404).send("post not Found");
        }else {
            res.status(200).json({message : "Post Updated successfully", post: updatedPost});
        }        
    }

    //additional tasks 
    filterPostsByCaption(req, res) {
        const { caption } = req.query;
        const filteredPosts = PostModel.filterByCaption(caption);
        res.status(200).json(filteredPosts);
    }

    // 3. Bookmark a post
    bookmarkPost(req, res) {
        const { id } = req.params;
        const userId = req.userId;
        const result = PostModel.bookmarkPost(id, userId);

        if (result) {
            res.status(200).json({ message: 'Post bookmarked successfully', result });
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    }

    // 4. Save post engagement
    savePost(req, res) {
        const { id } = req.params;
        const userId = req.userId;
        const date = new Date();
        const result = PostModel.savePost(id, userId, date);

        if (result) {
            res.status(200).json({ message: 'Post saved successfully', result });
        } else {
            res.status(404).json({ message: 'Post not found' });
        }
    }
    
}