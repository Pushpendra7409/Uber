import captainModel from "../models/captain.model.js";
import { createCaptain } from "../services/captain.service.js";
import { validationResult } from 'express-validator';


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


