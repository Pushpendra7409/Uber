import userModel from "../models/user.model.js";

export const createUser = async ({
   fullname, email, password
}) => {
    if (!fullname || !fullname.firstname || !fullname.lastname || !email || !password) {
        throw new Error("All fields are required");
    }
    const user = await userModel.create({
        fullname: {
            firstname: fullname.firstname,
            lastname: fullname.lastname
        },
        email,
        password
    });

    return user;
}