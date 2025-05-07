import jwt from 'jsonwebtoken';
import UserController from '../User/user.controller.js';

const jwtAuth = ((req,res,next) => {
    const token = req.headers['authorization'];
    if(!token){
        return res.status(401).send("Unauthorized entry");
    }

    try {
        const payload = jwt.verify(token,'9364abde78b5494679979b84b76ef131cd088725110c7dab38e5042f9bd9e04a');
        req.userId = payload.userId;
    } catch (error) {
        return res.status(401).send("Unauthorized");
    }
    next();
});

export default jwtAuth;