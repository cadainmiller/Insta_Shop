const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;
const orderSchema = new Schema(
  {
    OrderId: {
      type: String,
      // required: true,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        // required: true,
      },
    ],
    quantity: {
      type: Number,
    },
    total: {
      type: Number,
      // required: true,
    },
    tax: {
      type: Number,
      // required: true,
    },
    final_cost: {
      type: Number,
      // required: true,
    },
    shipping: {
      type: String,
      // required: true,
    },
    notes: {
      type: String,
      // required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
orderSchema.plugin(uniqueValidator, {
  message: "{PATH} Already in use",
});
