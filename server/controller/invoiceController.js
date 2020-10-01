const Invoice = require("../model/invoiceModel");
const orderController = require("../controller/orderController");
const pdfMake = require("../pdfmake/pdfmake");
const vfsFonts = require("../pdfmake/vfs_fonts");
const events = require("events");
const { emit } = require("process");

pdfMake.vfs = vfsFonts.pdfMake.vfs;
var eventEmitter = new events.EventEmitter();

var invoicepdf = "";
var createInvoice = {};

var documentDefinition = {
  info: {
    title: "awesome Document",
    author: "john doe",
    subject: "subject of document",
    keywords: "keywords for document",
  },
  content: [`Hello`, "Nice to meet you!"],
};

function functionData(data) {
  if (data) {
    //eventEmitter.emit("urlReady", data);
    invoicepdf = data;
  }
}

function pdfHandler(data) {
  invoicepdf = data;
}

function createDoc(info) {
  var pdfsomething = pdfMake.createPdf(info);
  pdfsomething.getDataUrl(functionData);
  // eventEmitter.on("urlReady", pdfHandler);
}

createDoc(documentDefinition);

exports.createInvoice = async (req, res) => {
  try {
    let invoice = new Invoice({
      invoiceId: req.body.invoiceId,
      order: req.body.order,
      notes: req.body.notes,
      invoiceDoc: invoicepdf,
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

exports.getInvoiceById = async (req, res, next) => {
  try {
    const invoiceId = req.params.invoiceId;
    const invoice = await Invoice.findOne({ invoiceId: invoiceId }).exec((err, invoice) => {
      if (err) {
        res.status(500).json(err);
      } else if (!invoice) {
        res.status(404).json("Invoice does not exist");
      }
      res.status(200).json(invoice);
    });
  } catch (error) {
    next(error);
  }
};

