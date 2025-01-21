import { Exercise } from "../../../DB/models/exerciseModel.js";
import { Workout } from "../../../DB/models/workoutModel.js";
import { asyncHandler } from "../../utils/asyncHandler.js";


export const addExercise=asyncHandler(async(req,res,next)=>{
    const {workoutId}=req.params;

    const workout=await Workout.findById(workoutId);

    if(!workout || workout.user.toString() !== req.user._id.toString())return next(new Error("Workout not found or access denied!",{cause:404}));

    const exercise= await Exercise.create({...req.body,workout: workoutId});

    workout.exercises.push({
        exerciseID:exercise._id,
        name:exercise.name,
        sets:exercise.sets,
        reps:exercise.reps,
        comments:exercise.comments
    });
    await workout.save();

    return res.status(201).json({
        success:true,
        message:"Exercise created successfully"
    });
});

export const deleteExercise=asyncHandler(async(req,res,next)=>{
    const {workoutId,id}=req.params;

    const workout=await Workout.findById(workoutId);

    if(!workout || workout.user.toString() !== req.user._id.toString())return next(new Error("Workout not found or access denied!",{cause:404}));

    const exercise=await Exercise.findByIdAndDelete(id);
    if(!exercise)return next(new Error("Exercise not found!",{cause:404}));

    workout.exercises = workout.exercises.filter(ex => ex.exerciseID.toString() !== id);

    // Save the updated workout
    await workout.save();

    return res.status(201).json({
        success:true,
        message:"Exercise deleted successfully"
    });
});

export const updateExercise=asyncHandler(async(req,res,next)=>{
    const {workoutId,id}=req.params;
    const {name,sets,reps,comments}=req.body;

    const workout=await Workout.findById(workoutId);

    if(!workout || workout.user.toString() !== req.user._id.toString())return next(new Error("Workout not found or access denied!",{cause:404}));

    const exercise=await Exercise.findByIdAndUpdate(id,{name,sets,reps,comments});
    if(!exercise)return next(new Error("Exercise not found!",{cause:404}));

    const exerciseIndex = workout.exercises.findIndex(ex => ex.exerciseID.toString() === id);
    if (exerciseIndex !== -1) {
        workout.exercises[exerciseIndex] = {
            exerciseID: exercise._id,
            name: exercise.name,
            sets: exercise.sets,
            reps: exercise.reps,
            comments: exercise.comments
        };
    }

    // Save the updated workout
    await workout.save();

    return res.status(201).json({
        success:true,
        message:"Exercise updated successfully",
        exercise
    });
});