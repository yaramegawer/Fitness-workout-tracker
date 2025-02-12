import { model, Schema } from "mongoose";

const userSchema=new Schema({
    userName:{
        type:String,
        min:3,
        max:25,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true,
        minlength: 8,
    },
    forgetCode:{
        type:String,
        length:5
    }
},{timestamps:true});

export const User=model("User",userSchema);