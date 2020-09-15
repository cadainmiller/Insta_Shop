const express = require("express");
const router = express.Router();
const multer = require("multer");
const productController = require("../controller/productController");
const auth = require("../middleware/auth");

const product_image = multer({
  limits: {
    fileSize: 1000000,
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpg|png|JPG|PNG|JPEG|jpeg)$/))
      return cb(new Error("This is not a correct format of the file"));
    cb(undefined, true);
  },
});

router.post(
  "/add",
  
  product_image.single("product_image"),
  productController.addNewProduct
);
router.get("/",  productController.getProduct);

router.get("/:productId", auth, productController.getProductById);
router.put("/:productId", auth, productController.updateProductById);
router.delete("/:productId", auth, productController.deleteProduct);

module.exports = router;
