const Invoice = require("../model/invoiceModel");
const Product = require("../model/productModel");
const orderController = require("../controller/orderController");
const pdfMake = require("../pdfmake/pdfmake");
const vfsFonts = require("../pdfmake/vfs_fonts");
const events = require("events");
const Email = require("../config/email");
require("dotenv").config();

pdfMake.vfs = vfsFonts.pdfMake.vfs;
var eventEmitter = new events.EventEmitter();

var invoicepdf = "";
var createInvoice = {};
var pdfdoc =
  "JVBERi0xLjMKJf////8KNSAwIG9iago8PAovVHlwZSAvUGFnZQovUGFyZW50IDEgMCBSCi9NZWRpYUJveCBbMCAwIDU5NS4yOCA4NDEuODldCi9Db250ZW50cyAzIDAgUgovUmVzb3VyY2VzIDQgMCBSCj4+CmVuZG9iago0IDAgb2JqCjw8Ci9Qcm9jU2V0IFsvUERGIC9UZXh0IC9JbWFnZUIgL0ltYWdlQyAvSW1hZ2VJXQovRm9udCA8PAovRjEgNiAwIFIKPj4KPj4KZW5kb2JqCjcgMCBvYmoKPDwKL1Byb2R1Y2VyIChwZGZtYWtlKQovQ3JlYXRvciAocGRmbWFrZSkKL0NyZWF0aW9uRGF0ZSAoRDoyMDIwMTAwMTAwMDMyMFopCi9UaXRsZSAoYXdlc29tZSBEb2N1bWVudCkKL0F1dGhvciAoam9obiBkb2UpCi9TdWJqZWN0IChzdWJqZWN0IG9mIGRvY3VtZW50KQovS2V5d29yZHMgKGtleXdvcmRzIGZvciBkb2N1bWVudCkKPj4KZW5kb2JqCjkgMCBvYmoKPDwKL1R5cGUgL0ZvbnREZXNjcmlwdG9yCi9Gb250TmFtZSAvSUNNR1hFK1JvYm90by1SZWd1bGFyCi9GbGFncyA0Ci9Gb250QkJveCBbLTczNi44MTY0MDYgLTI3MC45OTYwOTQgMTE0OC40Mzc1IDEwNTYuMTUyMzQ0XQovSXRhbGljQW5nbGUgMAovQXNjZW50IDkyNy43MzQzNzUKL0Rlc2NlbnQgLTI0NC4xNDA2MjUKL0NhcEhlaWdodCA3MTAuOTM3NQovWEhlaWdodCA1MjguMzIwMzEzCi9TdGVtViAwCi9Gb250RmlsZTIgOCAwIFIKPj4KZW5kb2JqCjEwIDAgb2JqCjw8Ci9UeXBlIC9Gb250Ci9TdWJ0eXBlIC9DSURGb250VHlwZTIKL0Jhc2VGb250IC9JQ01HWEUrUm9ib3RvLVJlZ3VsYXIKL0NJRFN5c3RlbUluZm8gPDwKL1JlZ2lzdHJ5IChBZG9iZSkKL09yZGVyaW5nIChJZGVudGl0eSkKL1N1cHBsZW1lbnQgMAo+PgovRm9udERlc2NyaXB0b3IgOSAwIFIKL1cgWzAgWzkwOCA3MTIuODkwNjI1IDUyOS43ODUxNTYgMjQyLjY3NTc4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";

var documentDefinition = {
  info: {
    title: "INVOICE",
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

async function getProductById(id) {
  try {
    const product = await Product.findOne({ productId: id }).exec(
      (err, product) => {
        if (err) {
          res.status(500).json(err);
        } else if (!product) {
          res.status(404).json("Product does not exist");
        }
        res.status(200).json(product);
        console.log("HERE")
      }
    );
  } catch (error) {
    next(error);
  }
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
        getProductById(productid);
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
