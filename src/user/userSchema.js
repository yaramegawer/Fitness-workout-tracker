import joi from 'joi';

export const register=joi.object({
    userName:joi.string().min(3).max(25).required(),
    email:joi.string().email().required(),
    password:joi.string().min(8).pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/).required().messages({
        'string.pattern.base': 'Password must include at least one  letter, one number, and be at least 8 characters long.'}),
    confirmPassword:joi.string().valid(joi.ref("password")).required(),
}).required();

export const login=joi.object({
    email:joi.string().email().required(),
    password:joi.string().min(8).pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/).required().messages({
        'string.pattern.base': 'Password must include at least one  letter, one number, and be at least 8 characters long.'}),
}).required();

export const activateAccount=joi.object({
    token:joi.string().required(),
}).required();

export const forgetCode=joi.object({
    email:joi.string().email().required(),
}).required();

export const resetPassword=joi.object({
    email:joi.string().email().required(),
    password:joi.string().min(8).pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/).required().messages({
        'string.pattern.base': 'Password must include at least one  letter, one number, and be at least 8 characters long.'}),
    confirmPassword:joi.string().valid(joi.ref("password")).required(),
    forgetCode:joi.string().length(5).required(),
}).required();