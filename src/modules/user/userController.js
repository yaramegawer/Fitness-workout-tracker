import { asyncHandler } from "../../utils/asyncHandler.js";
import { User } from '../../../DB/models/userModel.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Token } from '../../../DB/models/tokenModel.js';
import { sendEmail } from '../../utils/sendEmails.js';
import randomstring from 'randomstring';

export const register=asyncHandler(async(req,res,next)=>{
    const {email,password}=req.body;

    const user=await User.findOne({email});
    if(user)
        return next(new Error("User already registered, please login to your account",{cause:403}));

    const hashedPassword=bcrypt.hashSync(password,parseInt(process.env.SALT_ROUND));

    //generate token
       return res.status(201).json({
        success:true,
        message:"user registered successfully "
    })
});


export const login=asyncHandler(async(req,res,next)=>{
    const {email,password}=req.body;

    const user=await User.findOne({email});
    if(!user)
        return next(new Error("Invalid Email!",{cause:403}));
    const match=bcrypt.compareSync(password,user.password);
    if(!match)
        return next(new Error("Invalid password!",{cause:403}));

    const token=jwt.sign({email,id:user._id},process.env.SECRET_KEY);

    await Token.create({token,user:user._id,});

    res.status(200).json({
        success:true,
        message:"User logged in successfully!",
        token,
    });
});

export const forgetCode=asyncHandler(async(req,res,next)=>{
    const {email}=req.body;

    const user=await User.findOne({email});
    if(!user)
        return next(new Error("user not found!",{cause:404}));

 
    const forgetCode=randomstring.generate({
        charset:"numeric",
        length:5,
    });

    user.forgetCode=forgetCode;
    await user.save();

    const messageSent=await sendEmail({to:email,subject:"Reset password",html:`<h1>Your code is:: ${forgetCode}</h1>`});
    if(!messageSent) 
        return next(new Error("Something went wrong!"))
    
    return res.status(200).json({
        success:true,
        message:'Check your email',
        forgetCode
    });
});

export const resetPassword=asyncHandler(async(req,res,next)=>{
    const {email,password,forgetCode}=req.body;

    const user=await User.findOne({email});
    if(!user)
        return next(new Error("User not found",{cause:404}));

    if(forgetCode!==user.forgetCode) return next(new Error("Invalid code",{cause:403}));

    const hashedPassword=bcrypt.hashSync(password,parseInt(process.env.SALT_ROUND));

    user.password=hashedPassword;
    await user.save();

    const tokens=await Token.find({user:user._id});
    //invalidate all tokens
    tokens.forEach(async(token)=>{
        token.isValid=false;
        await token.save();
    })
    //send response
    return res.json({
        success:true,
        message:"Try to login now:)"
    });
});