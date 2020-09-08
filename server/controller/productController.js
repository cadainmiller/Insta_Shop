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

exports.getProductById = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId);
    if (!product) return next(new Error("Product does not exist"));
    res.status(200).json({
      data: product,
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
    const product = await User.findById(productId);
    res.status(200).json({
      data: product,
      message: "Product has been updated",
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
