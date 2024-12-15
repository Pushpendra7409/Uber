import userModel from "../models/user.model.js";
import bcryptjs from 'bcryptjs'
import jwt from "jsonwebtoken";
import BlacklistToken from '../models/blocklistToken.model.js'
import captainModel from "../models/captain.model.js";

export const authUser = async (req, res, next) => {
    const token =
      req.cookies?.token || 
      (req.headers.authorization && req.headers.authorization.split(' ')[1]);
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized access' });
    }
       const isBlackListed = await BlacklistToken.findOne({ token: token});

       if(isBlackListed) {
        return res.status(401).json({ message: 'Token is blacklisted' });
 
       }

    try {
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await userModel.findById(decoded._id);

        req.user = user;
        return next();

    } catch (error) {
        return res.status(401).json({ message: 'Unauthorized access' });
    }
}

export const authCaptain = async (req, res, next) => {
    const token = req.cookies?.token || (req.headers.authorization && req.headers.authorization.split(' ')[1]);

    //  console.log(token); 

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized access' });
    }
       const isBlackListed = await BlacklistToken.findOne({ token: token});

    //    console.log(isBlackListed);

       if(isBlackListed) {
        return res.status(401).json({ message: 'Token is blacklisted' });
 
       }

    try {
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const captain = await captainModel.findById(decoded._id);

        req.captain = captain;
        return next();

    } catch (error) {

        // console.log(error)
        return res.status(401).json({ message: 'Unauthorized access' });
    }
};


