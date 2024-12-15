import { registerCaptain, getCaptainProfile, loginCaptain, logoutCaptain } from '../controllers/captain.controller.js';
import express from 'express';
const captainrouter = express.Router();
import { body, validationResult } from 'express-validator';
import { authCaptain } from '../middlewares/auth.middleware.js'

captainrouter.post('/register', [
    body('fullname.firstname').isLength({ min: 3 }).withMessage('First name at least 3 characters long'),
    body('fullname.lastname').isLength({ min: 3 }).withMessage('Last name atleast 3 characters long'),
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 8 }).withMessage('Password at least 8 characters long'),
    body('vehicle.color').isLength({ min: 3 }).withMessage('Color must be atleast 3 characters long'),
    body('vehicle.plate').isLength({ min: 3 }).withMessage('Plate must be atleast 3 character long'),
    body('vehicle.capacity').isInt({min: 1}).withMessage('Capacity must be atleast 1'),
    body('vehicle.vehicleType').isIn([ 'bus', 'motorcycle', 'car', 'auto']).withMessage('Invalid vehicle type must'),
], registerCaptain);

captainrouter.post('/login',[
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 8 }).withMessage('Password at least 8 characters long'),
 ], loginCaptain);


captainrouter.get('/profile', authCaptain, getCaptainProfile )

captainrouter.get('/logout', authCaptain, logoutCaptain)




export default captainrouter