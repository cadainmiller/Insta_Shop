
const mongoose = require("mongoose");
var uniqueValidator = require('mongoose-unique-validator');
const product = require("../model/productModel");

const Schema = mongoose.Schema;
const invoiceSchema = new Schema({
    invoiceId: {
        type: String,
        required: true,
    },

    product: [{
        type: Schema.Types.ObjectId,
        ref: product
    }],

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