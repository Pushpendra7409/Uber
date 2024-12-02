import express from 'express';
const router = express.Router();
import { body, validationResult } from 'express-validator';
import { registerUser, loginUser } from '../controllers/user.controller.js';

router.post('/register', [ 
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name atleast 3 characters long'),
    body('fullname.lastname').isLength({ min: 3 }).withMessage('Last name atleast 3 characters long'),
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 8 }).withMessage('Password at least 8 characters long'),
], registerUser)


router.post('/login', [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 8 }).withMessage('Password at least 8 characters long'),
], loginUser)





export default router