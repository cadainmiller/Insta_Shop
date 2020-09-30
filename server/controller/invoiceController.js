const Invoice = require("../model/invoiceModel");
const orderController = require("../controller/orderController");
const pdfMake = require("../pdfmake/pdfmake");
const vfsFonts = require("../pdfmake/vfs_fonts");

pdfMake.vfs = vfsFonts.pdfMake.vfs;

exports.createInvoice = async (req, res) => {
  try {
    // const order = await orderController.invoiceId.find({
    //   _id: new mongoose.Types.ObjectId(req.body.order),
    // });
    // console.log(order);

    var documentDefinition = {
      content: [`Hello`, "Nice to meet you!"],
    };

    pdfMake.createPdf(documentDefinition).getDataUrl(function (dataURL) {
      console.log(dataURL);
    });

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
