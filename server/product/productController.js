
const Product = require("./productModel");

exports.addNewProduct = async (req, res) => {
    try {
        let product = new Product({
            name: req.body.name,
            description: req.body.description,
            productId: req.body.productId,
            stock: req.body.stock,
            sale: false,
        })
        let createProduct = await product.save();
        res.status(200).json({
            msg: "New product created",
            data: createProduct
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            error: err
        })
    }
}


