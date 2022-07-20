const mongoose = require('mongoose')
const app = require('./app')
const express = require('express')
const http = require('http')
const app = express()
const cors = require('cors')

const blogRouter = require('./controllers/blog')
const middleware = require('./utils/middleware')

const config = require('./utils/config')
const logger = require('./utils/logger')

const server = http.createServer(app)

server.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
})