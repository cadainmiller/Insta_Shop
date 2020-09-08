const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");
const auth = require("../middleware/auth");

router.post("/add", auth, productController.addNewProduct);
router.get("/", auth, productController.getProduct);

module.exports = router;
