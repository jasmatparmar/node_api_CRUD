const mongoose = require("mongoose")

const registerSchema = mongoose.Schema({
    name:{
        type: String,
        required: [true, 'Please enter Name']
    },
    userId: {
        type: String,
        required: [true, 'Please enter Email']
    },
    contact:{
        type: String,
        required: [true, 'Please enter Contact Number']
    },
    password: {
        type: String,
        required: [true, 'Please enter Password']
    }
})

const productSchema = mongoose.Schema(
    {
        name:{
            type: String,
            required: [true, 'Please enter Name']
        },
        quantity:{
            type: Number,
            required: true,
            default: 0
        },
        price:{
            type:Number,
            required: true
        },
        image:{
            type: String
        }
    },
    {
        timestamps: true
    }
)

const Product = mongoose.model('Product', productSchema);
const Register = mongoose.model('Register', registerSchema);

module.exports = Product;
module.exports = Register;