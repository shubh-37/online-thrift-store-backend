const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    prodName: {
        type: String,
        unique: [true, "Product already exists"],
        required: [true, "Product name required"],
        maxLength: [15, "Too long"]
    },
    prodSize: {
        type: String,
        enum: ["XS","S","M","L","XL"],
        default: "S",
        required: [true, "Please provide a size"]
    },
    quantity: {
        type: Number,
        default: 1,
        required: [true, "Product quantity is required"]
    },
    availability: {
        type: Boolean,
        default: false
    },
    prodPrice: {
        type: Number,
        required: [true, "Product price is necessary"],
    }
});

module.exports = productSchema;