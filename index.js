'use strict'

var express = require('express')
var Minivault = require('minivault-core')

var router = express.Router()

router.all('*', function (req, res, next) {
  var secret = req.get('X-Secret')
  if (typeof secret !== 'string' || secret.length === 0) {
    return res.status(401).json({error: 'Invalid secret'})
  }
  req.vault = new Minivault({secret: secret})
  next()
})

router.route('/entries')
  .get(function (req, res) {
    req.vault.index()
      .then(function (index) {
        res.json(index)
      }, function (err) {
        res.status(500).json({error: err.message})
      })
  })

router.route('/entries/:id')
  .get(function (req, res) {
    req.vault.get(req.params.id)
      .then(function (data) {
        res.json(data)
      }, function (err) {
        if (err.code === 'ENOENT') {
          res.sendStatus(404)
        } else {
          res.status(500).json({error: err.message})
        }
      })
  })
  .put(function (req, res) {
    if (req.body === null || typeof req.body !== 'object') {
      return res.status(500).json({error: 'Invalid data'})
    }
    req.vault.put(req.params.id, req.body)
      .then(function () {
        res.json({success: true})
      }, function (err) {
        res.status(500).json({error: err.message})
      })
  })
  .delete(function (req, res) {
    req.vault.delete(req.params.id)
      .then(function () {
        res.json({success: true})
      }, function (err) {
        if (err.code === 'ENOENT') {
          res.sendStatus(404)
        } else {
          res.status(500).json({error: err.message})
        }
      })
  })

module.exports = router
