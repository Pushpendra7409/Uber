import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';


const captainSchema = new mongoose.Schema({

    fullname: {
        firstname: {
            type: String,
            required: true,
            minlength: [3, 'First name must be at least 3 characters long'],
        },
        lastname: {
            type: String,
            // required: true,
            minlength: [3, 'First name must be at least 3 characters long'],
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        minlength: [5, 'Email must be at least 5 characters long'],
        // match: [ /^\S+@\S+\.\S+$/, 'Please Enter a valid email address']
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    soketId: {
        type: String,
    },

    status: {
        type: String,
        default: 'inactive',
        enum: ['active', 'inactive'],
    },

    vehicle: {
       color: {
        type: String,
        required: true,
        minlength: [3, 'Color must be atleast 3 characters long']
       }, 
       plate: {
        type: String,
        required: true,
        minlength: [7, 'Plate must be at least 7 characters long']
       },
       capacity: {
        type: Number,
        required: true,
        min: [1,'capacity must be atleast 1' ],
       },
       vehicleType: {
        type: String,
        required: true,
        enum: ['bus', 'motorcycle', 'car', 'auto'],
       }
    },

    location: {
        latitude: {
           type: Number,

        },
        longitude: {
            type: Number,

        }
    },

})

captainSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, { expiresIn: '24h'})
  return token; 
}

captainSchema.methods.comparePassword = async function(password) {
    return await bcryptjs.compare(password, this.password);
}

captainSchema.statics.hashPassword = async function (password) {
    return await bcryptjs.hash(password, 10);   
}


  const captainModel = mongoose.model('captain', captainSchema);

  export default captainModel;
