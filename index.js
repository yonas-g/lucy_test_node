var express = require('express')
var bodyParser = require('body-parser')
var ejs = require('ejs')
require('dotenv').config()

var HelloCash = require('./hellocash')

var app = express()

app.use(bodyParser.json())

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static('public'))

var port = process.env.PORT || 5000

app.get('/', function (req, res) {
  console.log(req)
  res.status(200).json({
    message: 'Welcome'
  })
})

app.post('/', function (req, res) {
  var data = req.body
  var token = req.headers.token

  console.log(data)
  if (token === '123456t') {
    res.status(200).json({
      message: 'Data has been added',
      data: data
    })
  } else {
    res.status(403).json({
      status: 'FORBIDEN',
      message: 'You are not allowed'

    })
  }

})

//HelloCash services
app.get('/invoices', (req, res) => {
  var who = req.query.who || 'kidus'
  HelloCash.getInvoices(who)
    .then(invoices => {
      res.render('invoices.html.ejs', { invoices: invoices })
      // console.log('SERVICE', invoices)
      // res.setHeader('Content-Type', 'application/json')
      // res.status(200).json(invoices)

    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
})
app.get('/account', (req, res) => {
  var who = req.query.who || 'kidus'
  HelloCash.account(who).then(data => {
    res.render('account.html.ejs', { account: data })
  })
})

app.listen(port, function () {
  console.log(`Server listening on port: ${port}`)
})
