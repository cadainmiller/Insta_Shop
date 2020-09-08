const Invoice = require("../model/invoiceModel");

exports.createInvoice = async (req, res) => {
    try {
      let invoice = new Invoice({
        invoiceId: req.body.invoiceId,
        products: req.body.product,
        notes: req.body.notes,
        totalCost: req.body.totalCost,
        tax: req.body.tax
      });

      let createInvoice = await invoice.save();
      res.status(200).json({
        msg: "New Invoice created",
        data: createInvoice,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    }
  };