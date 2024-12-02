import userModel from "../models/user.model.js";
import { createUser } from '../services/user.service.js'
import { validationResult } from 'express-validator';

export const registerUser = async (req, res, next) => {

   const errors = validationResult(req);
   if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
   }

//    console.log(req.body);

   const { fullname, password, email } = req.body;
   
    const hashedPassword = await userModel.hashPassword(password);

    const user = await createUser({
      fullname,
      password: hashedPassword,
      email
    });

    const token = user.generateAuthToken();

    res.status(201).json({ user, token });


  };

export const loginUser = async (req, res, next) => {

     const errors = validationResult(req);
     if (!errors.isEmpty()) {
       return res.status(400).json({ errors: errors.array() });
     }

     const { email, password } = req.body;

     const user = await userModel.findOne({ email }).select('+password');

     if(!user) {
      return res.status(401).json({ message: 'Invalid email and Password' });
     }

     const isMatch = await user.comparePassword(password);
     if(!isMatch) {
      return res.status(401).json({ message: 'Invalid email and Password' });
     }

     const token = user.generateAuthToken();

     res.cookie('token', token);
    //  {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === 'production',
    //   maxAge: 3600000, // 1 hour
    // });

     res.status(200).json({ token, user });
  };

export const getUserProfile = async (req, res, next) => {

    res.status(200).json(req.user);

  };