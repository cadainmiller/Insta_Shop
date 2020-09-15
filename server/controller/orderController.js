const Order = require("../model/orderModel");
const Product = require("../model/productModel");

exports.createOrder = async (req, res) => {
  const uniqueId = (length = 8) => {
    return parseInt(
      Math.ceil(Math.random() * Date.now())
        .toPrecision(length)
        .toString()
        .replace(".", "")
    );
  };

 

  const gctTax = 0.165 * req.body.total;
  const totalcost = Math.round(gctTax * 100) / 100 + req.body.total

  try {
    let order = new Order({
      orderId: "INV" + uniqueId(),
      quantity: req.body.quantity,
      products: req.body.products,
      notes: req.body.notes,
      total: req.body.total,
      tax: Math.round(gctTax * 100) / 100,
      final_cost: totalcost,
      shipping: req.body.shipping,
    });
    let createOrder = await order.save();
    res.status(200).json({
      msg: "New Orders created",
      data: createOrder,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  }
};


exports.getOrders = async (req, res, next) => {
  
  const orders = await Order.find({}).populate('Product').exec((err, orders) => {
    if (err) {
      res.status(500).json(err);
    } else if (!orders) {
      res.status(404).json();
    }
    res.status(200).json({
      Orders: orders,
    });
  }); 
};

// const products = await Product.findById(orders.products[0]).exec((err, product) =>{
//   if (err) {
//     res.status(500).json(err);
//   } else if (!orders) {
//     res.status(404).json();
//   }
//   res.status(200).json({
//   Orders: orders,
//   Product: product
// });