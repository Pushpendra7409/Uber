import captainModel from "../models/captain.model.js";

export const createCaptain = async ({
   fullname, email, password, vehicle
}) => {
    if (!fullname || !fullname.firstname || !fullname.lastname || !email || !password ||!vehicle ||!vehicle.plate || !vehicle.color || !vehicle.capacity || !vehicle.vehicleType ) {
        throw new Error("All fields are required");
    }
    const captain = await captainModel.create({
        fullname: {
            firstname: fullname.firstname,
            lastname: fullname.lastname
        },
        email,
        password,
        vehicle
    });

    return captain;
}