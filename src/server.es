'use strict'

import express from 'express'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import router from './'

const PORT = 4000

const app = express()
app.use(morgan('tiny'))
app.use(bodyParser.json())
app.use(router)
app.listen(PORT, () => console.info('Listening on port %d', PORT))
