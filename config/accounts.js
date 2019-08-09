var path = require("path");
require("dotenv").config({ path: path.resolve("./config/.env") });

var baseURL = "https://api-et.hellocash.net";
module.exports = {
  api: {
    authenticate: `${baseURL}/authenticate`,
    invoices: `${baseURL}/invoices`,
    accounts: `${baseURL}/accounts`
  },
  kidus: {
    principal: process.env.KIDUS_PRINCIPAL,
    credentials: process.env.KIDUS_CREDENTIALS,
    system: process.env.KIDUS_SYSTEM
  },
  yemane: {
    principal: process.env.YEMANE_PRINCIPAL,
    credentials: process.env.YEMANE_CREDENTIALS,
    system: process.env.YEMANE_SYSTEM
  },
  customers: {
    kaleab: "+251924102910",
    yonas: "+251924322570",
    leul: "+251983064336",
    philipos: "+251944233162",
    anduamlak: "+251933905958"
  }
};
