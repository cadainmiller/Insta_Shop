const express = require("express");
const router = express.Router();
const invoiceController = require("../controller/invoiceController");

router.post("/create", invoiceController.createInvoice);

module.exports = router;
