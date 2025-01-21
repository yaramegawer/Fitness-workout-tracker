import { Router } from "express";
import { isAuthenticated } from "../../middleware/authenticationMiddleware.js";
import { validation } from '../../middleware/validation.js';
import * as exerciseSchema from './exerciseSchema.js';
import * as exerciseController from './exerciseController.js';
const router=Router();

router.post('/:workoutId',isAuthenticated,validation(exerciseSchema.addExercise),exerciseController.addExercise);
router.delete('/:workoutId/:id',isAuthenticated,validation(exerciseSchema.deleteExercise),exerciseController.deleteExercise);
router.put('/:workoutId/:id',isAuthenticated,validation(exerciseSchema.updateExercise),exerciseController.updateExercise);


export default router;