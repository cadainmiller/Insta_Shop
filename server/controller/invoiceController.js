const Invoice = require("../model/invoiceModel");
const generateId = require("../shared/createUniqueId");
const orderController = require("../controller/orderController");
const pdfMake = require("../pdfmake/pdfmake");
const vfsFonts = require("../pdfmake/vfs_fonts");
const invoiceCreateDoc = require('../docs/invoiceCreateDoc')
const events = require("events");
const Email = require("../config/email");
require("dotenv").config();

pdfMake.vfs = vfsFonts.pdfMake.vfs;
var eventEmitter = new events.EventEmitter();

var invoicepdf = "";
var createInvoice = {};

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

createDoc(invoiceCreateDoc.create("INVOICE", "This is the subject"));

exports.createInvoice = async (req, res) => {

  try {
    let invoice = new Invoice({
      invoiceId: "INV-" + generateId(),
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
    const invoice = await Invoice.findOne({ invoiceId: invoiceId }).exec(
      (err, invoice) => {
        if (err) {
          res.status(500).json(err);
        } else if (!invoice) {
          res.status(404).json("Invoice does not exist");
        }
        res.status(200).json({ invoice });
      }
    );
  } catch (error) {
    next(error);
  }
};

exports.emailInvoiceById = async (req, res, next) => {
  try {
    const invoiceId = req.params.invoiceId;
    const invoice = await Invoice.findOne({ invoiceId: invoiceId }).exec(
      (err, invoice) => {
        if (err) {
          res.status(500).json(err);
        } else if (!invoice) {
          res.status(404).json("Invoice does not exist");
        }
        sendData = invoice.invoiceDoc.toString();
        productid = invoice.order.toString();
        id = invoice.invoiceId.toString();
        const [head, data] = sendData.split(",");
        Email.SendEmail("TestEMail@test.com", "Welocme to Company ", data, [
          {
            filename: `INVOICE-${id}.pdf`,
            content: sendData.split("base64,")[1],
            contentType: "application/pdf",
            encoding: "base64",
          },
        ]);
        res.status(200).json(invoice);
      }
    );
  } catch (error) {
    next(error);
  }
};
