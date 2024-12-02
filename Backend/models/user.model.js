import mongoose from "mongoose";
import bcryptjs from "bcryptjs";
import json from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    fullname: {
    firstname: {
        type: String,
        required: true,
        minlength: [3, 'First name must be at least 3 characters long'],
    },

    lastname: {
        type: String,
        // required: true,
        minlength: [3, 'Last name must be at least 3 characters long'],
    }
}, 

    email: {
    type: String,
    required: true,
    unique: true,
    minlength: [5, 'Email must be at least 5 characters long'],
    },

    password: {
        type: String,
        required: true,
        select: false,
    },
    
    sockedId: {
        type: String,
    }

})

userSchema.methods.generateAuthToken = function(){
    const token = json.sign({_id: this._id}, process.env.JWT_SECRET, { expiresIn: '24h'});
    return token;   
}

userSchema.methods.comparePassword = async function(password) {
    return await bcryptjs.compare(password, this.password);
}

userSchema.statics.hashPassword = async function (password) {
    return await bcryptjs.hash(password, 10);   
}

const userModel = mongoose.model('user', userSchema);

export default userModel;