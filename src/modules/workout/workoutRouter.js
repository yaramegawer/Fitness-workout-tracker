import { Router } from 'express';
import { isAuthenticated } from '../../middleware/authenticationMiddleware.js';
import { validation } from '../../middleware/validation.js';
import * as workoutSchema from './workoutSchema.js';
import * as workoutController from './workoutController.js';
const router=Router();

router.post('/',isAuthenticated,validation(workoutSchema.addWorkout),workoutController.addWorkout);
router.delete('/:id',isAuthenticated,validation(workoutSchema.deleteWorkout),workoutController.deleteWorkout);
router.put('/:id',isAuthenticated,validation(workoutSchema.updateWorkout),workoutController.updateWorkout);
router.get('/',isAuthenticated,workoutController.allWorkouts);

export default router;
