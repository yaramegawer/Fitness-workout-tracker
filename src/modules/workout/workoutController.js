import { Workout } from "../../../DB/models/workoutModel.js";
import { asyncHandler } from "../../utils/asyncHandler.js";

export const addWorkout=asyncHandler(async(req,res,next)=>{

    await Workout.create({...req.body,user:req.user});
    return res.status(201).json({
        success:true,
        message:"Workout created successfully"
    })
});

export const deleteWorkout=asyncHandler(async(req,res,next)=>{
    const {id}=req.params;

    const workout=await Workout.findByIdAndDelete(id);
    if(!workout)return next(new Error("Workout not found",{cause:404}));

    return res.status(200).json({
        success:true,
        message:"Workout deleted successfully"
    });
})

export const updateWorkout=asyncHandler(async(req,res,next)=>{
    const {id}=req.params;
    const {isCompleted}=req.body;
    const workout=await Workout.findByIdAndUpdate(id,{isCompleted},{ new: true });
    if(!workout)return next(new Error("Workout not found",{cause:404}));

    return res.status(200).json({
        success:true,
        message:"Workout updated successfully",
        workout
    });
});

export const allWorkouts=asyncHandler(async(req,res,next)=>{
    const { isCompleted } = req.query;
    const { status } = req.query;
    const userId = req.user.id; 
    let result;
    

    if (status === 'upcoming') {
        result = await Workout.find({
            user: userId,
            date: { $gte: new Date() }, // Fetch future dates
        }).sort({ date: 1 }); // Sort by ascending date
    } else if (status === 'past') {
        result = await Workout.find({
            user: userId,
            date: { $lt: new Date() }, // Fetch past dates
        }).sort({ date: -1 }); // Sort by descending date
    } else if(isCompleted !== undefined) {  // Check if `isCompleted` query param is provided
        result = await Workout.find({ isCompleted: isCompleted === 'true' }); // Convert string "true" to boolean
    } else {
        result = await Workout.find({});
    }
    
    return res.status(200).json({
        success:true,
        result
    })
});
