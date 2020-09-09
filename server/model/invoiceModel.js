const mongoose = require("mongoose");
var ObjectId = require("mongodb").ObjectID;
var uniqueValidator = require("mongoose-unique-validator");
const product = require("../model/productModel");

const Schema = mongoose.Schema;
const invoiceSchema = new Schema(
  {
    invoiceId: {
      type: String,
      required: true,
    },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      //required: true,
    },
    notes: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Invoice", invoiceSchema);
invoiceSchema.plugin(uniqueValidator, {
  message: "{PATH} Already in use",
});
