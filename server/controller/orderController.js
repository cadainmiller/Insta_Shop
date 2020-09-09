const Order = require("../model/orderModel");

exports.createOrder = async (req, res) => {
  try {
    let order = new Order({
      orderId: req.body.orderId,
      quantity: req.body.quantity,
      products: req.body.products,
      notes: req.body.notes,
      total: req.body.total,
      tax: req.body.tax,
      shipping: req.body.shipping,
    });

    let createOrder = await order.save();
    res.status(200).json({
      msg: "New Invoice created",
      data: createOrder,
      request: {
        type: "GET",
        url: "http://localhost:4000/" + createOrder._id,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  }
};

exports.getOrders = async (req, res, next) => {
  const orders = await Order.find({});
  res.status(200).json({
    Orders: orders,
  });
  res.json({
    Orders: orders,
  });
};
