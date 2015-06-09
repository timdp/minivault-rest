'use strict';

var _Object$defineProperty = require('babel-runtime/core-js/object/define-property')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

_Object$defineProperty(exports, '__esModule', {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _minivaultCore = require('minivault-core');

var _minivaultCore2 = _interopRequireDefault(_minivaultCore);

var router = _express2['default'].Router();

router.all('*', function (req, res, next) {
  var secret = req.get('X-Secret');
  if (typeof secret !== 'string' || secret.length === 0) {
    return res.status(401).json({ error: 'Invalid secret' });
  }
  req.vault = new _minivaultCore2['default']({ secret: secret });
  next();
});

router.route('/entries').get(function (req, res) {
  req.vault.index().then(function (index) {
    return res.json(index);
  })['catch'](function (err) {
    return res.status(500).json({ error: err.message });
  });
});

router.route('/entries/:id').get(function (req, res) {
  req.vault.get(req.params.id).then(function (data) {
    return res.json(data);
  })['catch'](function (err) {
    if (err.code === 'ENOENT') {
      res.sendStatus(404);
    } else {
      res.status(500).json({ error: err.message });
    }
  });
}).put(function (req, res) {
  if (req.body === null || typeof req.body !== 'object') {
    return res.status(500).json({ error: 'Invalid data' });
  }
  req.vault.put(req.params.id, req.body).then(function () {
    return res.json({ success: true });
  })['catch'](function (err) {
    return res.status(500).json({ error: err.message });
  });
})['delete'](function (req, res) {
  req.vault['delete'](req.params.id).then(function () {
    return res.json({ success: true });
  })['catch'](function (err) {
    if (err.code === 'ENOENT') {
      res.sendStatus(404);
    } else {
      res.status(500).json({ error: err.message });
    }
  });
});

exports['default'] = router;
module.exports = exports['default'];