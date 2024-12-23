import {Router} from 'express';
import * as userController from './userController.js';
import * as userSchema from './userSchema.js';
import { validation } from '../middleware/validation.js';
const router=Router();

router.post('/register',validation(userSchema.register),userController.register);
router.post('/login',validation(userSchema.login),userController.login);
router.get('/activate_account/:token',validation(userSchema.activateAccount),userController.activateAccount);
router.patch('/forget_code',validation(userSchema.forgetCode),userController.forgetCode);
router.patch('/reset_password',validation(userSchema.resetPassword),userController.resetPassword);
export default router;