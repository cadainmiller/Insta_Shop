const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");
const auth = require("../middleware/auth");

router.post("/add", auth, productController.addNewProduct);
router.get("/", auth, productController.getProduct);

router.get("/:productId", auth, productController.getProductById);
router.put("/:productId", auth, productController.updateProductById);
router.delete("/:productId", auth, productController.deleteProduct);

module.exports = router;
