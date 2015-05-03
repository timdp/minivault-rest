var express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    router = require('./');

var PORT = 4000;

var app = express();
app.use(morgan('tiny'));
app.use(bodyParser.json());

app.use(router);

app.listen(PORT, function() {
  console.info('Listening on port %d', PORT);
});
