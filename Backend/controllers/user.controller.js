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