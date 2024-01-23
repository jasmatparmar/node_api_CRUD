const mongoose = require("mongoose")

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

module.exports = Product;