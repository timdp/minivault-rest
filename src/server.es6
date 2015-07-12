'use strict'

import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import router from './'

const DEFAULT_HOSTNAME = 'localhost'
const DEFAULT_PORT = 4000

let hostname = DEFAULT_HOSTNAME
let port = DEFAULT_PORT

const args = process.argv.slice(2)
if (args.length) {
  if (args.length >= 2) {
    hostname = args.shift()
  }
  port = parseInt(args.shift())
}

const app = express()
app.use(morgan('tiny'))
app.use(bodyParser.json())
app.use(router)
app.listen(port, hostname,
  () => console.info('Listening on %s:%d', hostname, port))
