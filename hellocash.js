var config = require("./config/accounts");
var rp = require("request-promise-native");
var express = require("express");
var app = express();

var self = (module.exports = {
  login: who => {
    return new Promise((resolve, reject) => {
      if (Object.keys(config).includes(who)) {
        var options = {
          url: config.api.authenticate,
          method: "POST",
          body: config[who],
          json: true
        };
        rp(options)
          .then(function(data) {
            console.log(data);
            resolve(data.token);
          })
          .catch(err => {
            reject(err);
          });
      } else {
        reject({
          message: `Unknown account ${who}`
        });
      }
    });
  },
  getInvoices: whose => {
    return new Promise((resolve, reject) => {
      self
        .login(whose)
        .then(token => {
          var options = {
            url: config.api.invoices,
            method: "GET",
            json: true,
            headers: {
              authorization: `Bearer ${token}`
            }
          };
          return rp(options);
        })
        .then(invoices => {
          console.log(invoices);
          resolve(invoices);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  account: who => {
    return new Promise((resolve, reject) => {
      self
        .login(who)
        .then(token => {
          var options = {
            url: config.api.accounts,
            json: true,
            method: "GET",
            headers: {
              authorization: `Bearer ${token}`
            }
          };
          return rp(options);
        })
        .then(accounts => {
          resolve(accounts[0]);
          console.log(accounts[1]);
        })
        .catch(err => reject(err));
    });
  },
  createInvoice: (who, payload) => {
    return new Promise((resolve, reject) => {
      self.login(who).then(token => {
        let options = {
          url: config.api.invoices,
          json: true,
          method: "POST",
          headers: {
            authorization: `Bearer ${token}`
          },
          body: payload
        };

        rp(options)
          .then(Response => {
            resolve(Response).then(res.status(200).json(Response));
          })
          .catch(error => reject(error));
      });
    });
  }
});
