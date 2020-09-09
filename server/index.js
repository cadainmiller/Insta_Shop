const express = require("express");
const PORT = process.env.PORT || 4000;
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

const userRoutes = require("./routes/userRoute"); //bring in our user routes
const productRoutes = require("./routes/productRoute"); //bring in our product routes
const invoiceRoutes = require("./routes/invoiceRoute"); //bring in our invoice routes
const orderRoutes = require("./routes/orderRoute"); //bring in our invoice routes

app.use(cors()); // configure cors
//configure body parser
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
//configure body-parser ends here
app.use(morgan("dev")); // configire morgan

//bring in db config
require("./config/db")(app);
//db config ends here

// define first route
app.get("/api", (req, res) => {
  console.log("Hello MEAN Soldier...Ready For Battle??");
});

app.use("/user", userRoutes);
app.use("/product", productRoutes);
app.use("/order", orderRoutes);
app.use("/invoice", invoiceRoutes);

app.listen(PORT, () => {
  console.log(`App is running on ${PORT}`);
});
