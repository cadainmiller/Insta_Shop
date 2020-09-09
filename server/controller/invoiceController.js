const Invoice = require("../model/invoiceModel");

exports.createInvoice = async (req, res) => {
  try {
    let invoice = new Invoice({
      invoiceId: req.body.invoiceId,
      order: req.body.order,
      notes: req.body.notes,
    });

    let createInvoice = await invoice.save();
    res.status(200).json({
      msg: "New Invoice created",
      data: createInvoice,
      request: {
        type: "GET",
        url: "http://localhost:4000/" + createInvoice._id,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  }
};

exports.getInvoice = async (req, res, next) => {
  const invoice = await Invoice.find({}).exec((err, invoice) => {
    if (err) {
      res.status(500).json(err);
    } else if (!invoice) {
      res.status(404).json();
    }
    res.status(200).json({
      Invoice: invoice,
    });
  });
};
