import captainModel from "../models/captain.model.js";
import { createCaptain } from "../services/captain.service.js";
import { validationResult } from 'express-validator';
import BlacklistToken from '../models/blocklistToken.model.js';


export const registerCaptain = async (req, res, next) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // console.log(req.body);

    const { fullname, email, password, vehicle } = req.body;

    const isCaptainAlreadyExists = await captainModel.findOne({ email });

    if (isCaptainAlreadyExists) {
        return res.status(400).json({ message: 'Captain Already exists' });
    }
     
    const hashedPassword = await captainModel.hashPassword(password);

    const captain = await createCaptain({
        fullname: {
            firstname: fullname.firstname,
            lastname: fullname.lastname
        },
        email,
        password: hashedPassword,
        vehicle
    });

    const token = captain.generateAuthToken();

    res.status(201).json({ captain, token });

};

export const loginCaptain = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    const captain = await captainModel.findOne({ email }).select('+password');

    if(!captain){
        return res.status(401).json({ message: 'Invalid email and password' });
    }

    const isMatch = await captain.comparePassword(password);
    if(!isMatch) {
        return res.status(401).json({ message: 'Invalid email and password' });
    }

    const token = captain.generateAuthToken();

    res.cookie('token', token);
    // {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === 'production',
    //   maxAge: 3600000, // 1 hour
    // }
    res.status(200).json({ token, captain });
};

export const getCaptainProfile = async (req, res, next) => {
    res.status(200).json(req.captain);
};

export const logoutCaptain = async (req, res, next) => {
    const token = req.cookies.token || req.headers.authorization?.split(' ')[ 1 ];

    await BlacklistToken.create({ token });


    res.clearCookie('token');
    res.status(200).json({ message: 'Logout successfully' });
};

