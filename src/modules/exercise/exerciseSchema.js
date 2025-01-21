import joi from 'joi';
import { isValidObjectId } from '../../middleware/validation.js';

export const addExercise=joi.object({
    workoutId:joi.string().custom(isValidObjectId).required(),
    name:joi.string().max(20).min(3).required(),
    sets:joi.number().required(),
    reps:joi.number().required(),
    comments:joi.string(),
}).required();

export const deleteExercise=joi.object({
    workoutId:joi.string().custom(isValidObjectId).required(),
    id:joi.string().custom(isValidObjectId).required()
}).required();

export const updateExercise=joi.object({
    workoutId:joi.string().custom(isValidObjectId).required(),
    name:joi.string().max(20).min(3),
    sets:joi.number(),
    reps:joi.number(),
    comments:joi.string(),
    id:joi.string().custom(isValidObjectId).required()
}).required();
