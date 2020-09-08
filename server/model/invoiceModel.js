
const mongoose = require("mongoose");
var ObjectId = require('mongodb').ObjectID;
var uniqueValidator = require('mongoose-unique-validator');
const product = require("../model/productModel");

const Schema = mongoose.Schema;
const invoiceSchema = new Schema({
    invoiceId: {
        type: String,
        required: true,
    },

    product: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    }],

    quantity: {
        type: Number,
        default: 1
    },

    notes: {
        type: String,
        required: true
    },

    totalCost: {
        type: Number,
        required: true,
    },
    tax: {
        type: Number,
        required: true,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model("Invoice", invoiceSchema);
invoiceSchema.plugin(uniqueValidator, {
    message: '{PATH} Already in use'
});