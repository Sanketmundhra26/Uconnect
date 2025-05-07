//all imports for packages here
import bodyParser from 'body-parser';
import express from 'express';
import cors from 'cors'

//all imports of modules here
import userRouter from './src/features/User/user.routes.js';
import postRouter from './src/features/PostOnline/postOnline.routes.js';
import jwtAuth from './src/features/Middleware/jwtToken.middleware.js';
import likeRouter from './src/features/Likes/Likes.Routes.js';
import commentRouter from './src/features/Comment/comment.routes.js';
import loggerMiddleware from './src/features/Middleware/logger.middleware.js';
import { invalidRoutesHandlerMiddleware } from './src/features/Middleware/invalidroutes.middleware.js';
import applicationError from './src/features/error-handler/application-error.js';
import errorLoggerMiddleware from './src/features/Middleware/errorLogger.middleware.js'

//main code 
const app = express();

//all uses
app.use(bodyParser.json());
app.use(cors());
app.use(express.urlencoded({extended : false}));
app.use(loggerMiddleware);

//Application routes
app.use('/api',userRouter);
app.use('/api/posts',jwtAuth,postRouter);
app.use('/api/comments',jwtAuth,commentRouter);
app.use('/api/likes',jwtAuth,likeRouter);


//error handler middleware
app.use((err, req ,res ,next) => {
    //application level errors
    if(err instanceof applicationError){
        res.status(err.statusCode).send(err.message);
    }
    //server errors 
    res.status(503).send("Something went wrong");
});

//base route 
app.get('/',(req,res)=> {
    res.send('Welcome to UConnect Api');
});

app.use(invalidRoutesHandlerMiddleware);
app.use(errorLoggerMiddleware);

//exports 
export default app;