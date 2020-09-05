
const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    productId: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true,
    },
    sale: {
        type: Boolean,
        required: true,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("Product", productSchema);
productSchema.plugin(uniqueValidator, {
    message: '{PATH} Already in use'
});
