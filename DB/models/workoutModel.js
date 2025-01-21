
import { model, Schema, Types } from "mongoose";

const workoutSchema=new Schema({
    user:{
        type:Types.ObjectId,
        ref:"User",
        required:true
    },
    name:{
        type:String,
        max:20,
        min:3,
        required:true
    },
    date:{
        type:Date,
    },
    isCompleted:{
        type:Boolean,
        required:true,
        default:false
    },
    exercises: [{ 
        exerciseID:{
            type:Types.ObjectId, 
            ref: 'Exercise'
        },
        name:{type:String},
        reps:{type:String},
        sets:{type:String},
        comments:String

    }]
},{timestamps:true});

export const Workout=model("Workout",workoutSchema);