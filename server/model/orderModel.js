const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;
const orderSchema = new Schema(
  {
    orderId: {
      type: String,
      required: true,
    },
    products: [
      {
        name: {
          type: String,
          //required: true,
        },
        description: {
          type: String,
          //required: true,
        },
        product_image: {
          type: String,
        },
        productId: {
          type: String,
          //required: true,
        },
        shipping_details: {
          weight: {
            type: Number,
            default: 0,
          },

          width: {
            type: Number,
            default: 0,
          },
          height: {
            type: Number,
            default: 0,
          },
          depth: {
            type: Number,
            default: 0,
          },
        },
        quantity: {
          type: Number,
          default: 0,
        },
        sale: {
          type: String,
          default: "false",
        },
        price: {
          type: Number,
          default: 0,
        },
        sale_price: {
          type: Number,
          default: 0,
        },
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
