import { Schema, Types,model } from "mongoose";

const exerciseSchema=new Schema({
    workout:{
        type:Types.ObjectId,
        ref:"Workout",
        required:true
    },
    name:{
        type:String,
        max:20,
        min:3,
        required:true
    },
    sets:{
        type:Number,
        required:true
    },
    reps:{
        type:Number,
        required:true
    },
    comments:String

},{timestamps:true});

export const Exercise=model("Exercise",exerciseSchema);