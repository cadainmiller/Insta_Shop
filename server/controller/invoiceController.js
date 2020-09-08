const Invoice = require("../model/invoiceModel");

exports.createInvoice = async (req, res) => {
    try {
      let invoice = new Invoice({
        invoiceId: req.body.invoiceId,
        quantity: req.body.quantity,
        product: req.body.product,
        notes: req.body.notes,
        totalCost: req.body.totalCost,
        tax: req.body.tax
      });

      let createInvoice = await invoice.save();
      res.status(200).json({
        msg: "New Invoice created",
        data: createInvoice,
        request: {
            type: 'GET',
            url: 'http://localhost:4000/' + createInvoice._id
        }
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    }
  };

  exports.getInvoice = async (req, res, next) => {
    const invoice = await Invoice.find({});
    res.status(200).json({
     Invoices : invoice,
    });
    res.json({
      Invoices: invoice,
    });
  };