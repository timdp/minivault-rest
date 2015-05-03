var express = require('express')
var morgan = require('morgan')
var bodyParser = require('body-parser')
var router = require('./')

var PORT = 4000

var app = express()
app.use(morgan('tiny'))
app.use(bodyParser.json())

app.use(router)

app.listen(PORT, function () {
  console.info('Listening on port %d', PORT)
})
