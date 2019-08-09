var express = require("express");
var bodyParser = require("body-parser");
var ejs = require("ejs");
require("dotenv").config();
const moment = require("moment");
const uuid = require("uuid/v1");

var Eth_phonePrefix = "+2519"; //TODO: replace this with regex
var app = express();
var HelloCash = require("./hellocash");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// set the view engine to ejs
app.set("view engine", "ejs");
app.use(express.static("public"));

var port = process.env.PORT || 5000;

app.get("/", function(req, res) {
  console.log(req);
  res.status(200).json({
    message: "Welcome"
  });
});

app.get("/form", function(req, res, next) {
  res.render("form1.ejs", { message: " working!" });
});

app.post("/form", function(req, res, next) {
  body = req.body;
  if (Object.keys(body).includes("phone")) {
    body.phone = [
      Eth_phonePrefix,
      body.phone.substr(body.phone.length - 8, 9)
    ].join("");
  }
  let today = new Date(
    new Date().toLocaleString("en-US", { timeZone: "Africa/Nairobi" })
  );

  var payload = {
    from: body.phone,
    amount: parseFloat(body.amount),
    description: body.desc,
    expires: moment(today)
      .add(24, "hours")
      .toISOString(),
    notifyfrom: true,
    notifyto: true,
    currency: "ETB",
    tracenumber: uuid()
  };

  // res.status(200).json(payload);
  let who = body.radio;
  console.log(who);
  HelloCash.createInvoice(who, payload)
    .then(response => {
      // res.status(200).json(response);
      res.render("invoice_ok.html.ejs", { data: response });
      console.log("works");
      //res.render("invoices_ok.html.ejs", { invoices: HelloCash.getInvoices() });
    })
    .catch(err => {
      // console.log("here is an error");
      console.log(err);
      res.status(500).json(err);
    });
});

app.listen(port, function() {
  console.log(`Server listening on port: ${port}`);
});
