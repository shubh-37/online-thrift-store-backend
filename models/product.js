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
        enum: ["XS","S","M","L","XL","15''","13''","17''"],
        default: "S",
        required: [true, "Please provide a size"]
    },
    category: {
        type: String,
        enum: ["Clothing", "Accessories"],
        required: [true, "Please provide a category"]
    },
    condition: {
        type: String,
        enum: ["Like", "Like New", "Good", "Fair", "Poor"],
        required: [true, "Please provide a condition of your product"]
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