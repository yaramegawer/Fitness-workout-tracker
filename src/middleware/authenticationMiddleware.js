import { asyncHandler } from "../utils/asyncHandler.js";
import  jwt  from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Token } from './../../DB/models/tokenModel.js';
import { User } from './../../DB/models/userModel.js';

dotenv.config();

export const isAuthenticated=asyncHandler(async(req,res,next)=>{
    let token=req.headers['token'];

    if(!token) return next(new Error("Token is required!!"));
    
    const payload=jwt.verify(token,process.env.SECRET_KEY);

    const tokenDB=await Token.findOne({token,isValid:true});

    if(!tokenDB)return next(new Error("Token is invalid!"));

    const user=await User.findById(payload.id);
    if(!user) return next(new Error("User not found!",{cause:404}));
    //pass user
    req.user=user;
    //next()
    return next();


});