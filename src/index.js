'use strict'

import express from 'express'
import Minivault from 'minivault-core'

const router = express.Router()

router.all('*', (req, res, next) => {
  const secret = req.get('X-Secret')
  if (typeof secret !== 'string' || secret.length === 0) {
    return res.status(401).json({error: 'Invalid secret'})
  }
  req.vault = new Minivault({secret: secret})
  next()
})

router.route('/entries')
  .get((req, res) => {
    req.vault.index()
      .then(index => res.json(index))
      .catch(err => res.status(500).json({error: err.message}))
  })

router.route('/entries/:id')
  .get((req, res) => {
    req.vault.get(req.params.id)
      .then(data => res.json(data))
      .catch(err => {
        if (err.code === 'ENOENT') {
          res.sendStatus(404)
        } else {
          res.status(500).json({error: err.message})
        }
      })
  })
  .put((req, res) => {
    if (req.body === null || typeof req.body !== 'object') {
      return res.status(500).json({error: 'Invalid data'})
    }
    req.vault.put(req.params.id, req.body)
      .then(() => res.json({success: true}))
      .catch(err => res.status(500).json({error: err.message}))
  })
  .delete((req, res) => {
    req.vault.delete(req.params.id)
      .then(() => res.json({success: true}))
      .catch(err => {
        if (err.code === 'ENOENT') {
          res.sendStatus(404)
        } else {
          res.status(500).json({error: err.message})
        }
      })
  })

export default router
