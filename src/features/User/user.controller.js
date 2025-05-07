import UserModel from "./user.model.js";
import jwt from 'jsonwebtoken';

export default class UserController{

    getAll(req,res){
        const users = UserModel.getAll();
        res.send(users);
    }

    signUp(req,res){
        const {name,email,password} = req.body;
        const newUser = UserModel.signUp(name,email,password);
        res.status(201).send(newUser);
    }

    signIn(req,res) { 
        const {email,password} = req.body;
        const result = UserModel.signUp(email,password);
        if(!result) {
            res.status(400).send("User's credentials are not true");
        }else {
            //jwttoken here 
            const token = jwt.sign({userId : result.id, email : result.email},
                "9364abde78b5494679979b84b76ef131cd088725110c7dab38e5042f9bd9e04a",{expiresIn : '24h'});
            res.status(200).send("User Logged in successfully");
        }
    }
}