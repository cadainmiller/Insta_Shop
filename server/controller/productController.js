const Product = require("../model/productModel");

exports.addNewProduct = async (req, res) => {
  try {
    let product = new Product({
      name: req.body.name,
      description: req.body.description,
      productId: req.body.productId,
      stock: req.body.stock,
      sale: false,
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

exports.getProduct = async (req, res, next) => {
  const product = await Product.find({});
  res.status(200).json({
    Products: product,
  });
  res.json({
    Products: product,
  });
};
