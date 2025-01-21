import joi from 'joi';
import { isValidObjectId } from '../../middleware/validation.js';


export const addWorkout=joi.object(
    {
        name:joi.string().max(20).min(3).required(),
        date:joi.date(),
        isCompleted:joi.boolean().required(),
    }
).required();

export const deleteWorkout=joi.object({
    id:joi.string().custom(isValidObjectId).required()
}).required();

export const updateWorkout=joi.object({
    isCompleted:joi.boolean().required(),
    id:joi.string().custom(isValidObjectId).required()
}).required();
