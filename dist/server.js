'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _morgan = require('morgan');

var _morgan2 = _interopRequireDefault(_morgan);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _ = require('./');

var _2 = _interopRequireDefault(_);

var PORT = 4000;

var app = (0, _express2['default'])();
app.use((0, _morgan2['default'])('tiny'));
app.use(_bodyParser2['default'].json());
app.use(_2['default']);
app.listen(PORT, function () {
  return console.info('Listening on port %d', PORT);
});