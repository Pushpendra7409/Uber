import userModel from "../models/user.model.js";
import bcryptjs from 'bcryptjs'
import jwt from "jsonwebtoken";

export const authUser = async (req, res, next) => {
    const token =
      req.cookies?.token || 
      (req.headers.authorization && req.headers.authorization.split(' ')[1]);
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized access' });
    }
       const isBlackListed = await userModel.findOne({ token: token});

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


