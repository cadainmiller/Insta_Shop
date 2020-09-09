const mongoose = require("mongoose");
var uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    product_image: {
        type:String,
    },
    productId: {
      type: String,
      required: true,
    },
    shipping_details: {
      weight: {
        type: Number,
      },

      width: {
        type: Number,
      },
      height: {
        type: Number,
      },
      depth: {
        type: Number,
      },
    },
    quantity: {
      type: Number,
      required: true,
    },
    sale: {
      type: String,
      required: true,
    },
    price: {
        type: Number,
        default: 0
    },
    sale_price: {
        type: Number,
        default: 0
      },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
productSchema.plugin(uniqueValidator, {
  message: "{PATH} Already in use",
});
