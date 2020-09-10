const Product = require("../model/productModel");
const e = require("express");

exports.addNewProduct = async (req, res) => {
  const uniqueId = (length=8) => {
    return parseInt(Math.ceil(Math.random() * Date.now()).toPrecision(length).toString().replace(".", ""))
  }

  function squared(num) {
    if (num == "true") {
      return req.body.sale_price
    } else {
      return 0
    }
    
  }

  try {
    let product = new Product({
      name: req.body.name,
      description: req.body.description,
      product_image: req.body.product_image,
      productId: "PD"+ uniqueId(),
      shipping_details: req.body.shipping_details,
      quantity: req.body.quantity,
      sale: req.body.sale,
      sale_price: squared(req.body.sale),
      price: req.body.price,
    });
    let createProduct = await product.save();
    res.status(200).json({
      msg: "New product created",
      data: createProduct,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  }
};

// exports.getProduct = async (req, res, next) => {
//   const product = await Product.find({});
//   res.status(200).json({
//     Products: product,
//   });
//   res.json({
//     Products: product,
//   });
// };

exports.getProduct = async (req, res, next) => {
  const product = await Product.find({}).exec((err, product) => {
    if (err) {
      res.status(500).json(err);
    } else if (!product) {
      res.status(404).json();
    }
    res.status(200).json(product);
  });
};

exports.getProductById = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId).exec((err, product) => {
      if (err) {
        res.status(500).json(err);
      } else if (!product) {
        res.status(404).json("Product does not exist");
      }
      res.status(200).json(product);
    });
  } catch (error) {
    next(error);
  }
};

exports.updateProductById = async (req, res, next) => {
  try {
    const update = req.body;
    const productId = req.params.productId;
    await Product.findByIdAndUpdate(productId, update);
    const product = await User.findById(productId).exec((err, product) => {
      if (err) {
        res.status(500).json(err);
      } else if (!product) {
        res.status(404).json();
      }
      res.status(200).json({
        data: product,
        message: "Product has been updated",
      });
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    await User.findByIdAndDelete(productId);
    res.status(200).json({
      message: "Product has been deleted",
    });
  } catch (error) {
    next(error);
  }
};