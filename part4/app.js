const config = require('./utils/config')
const express = require('express')
const cors = require('cors')
const Router = require('./controllers/blog')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const usersRouter = require('./controllers/users')
const mongoose = require('mongoose')

logger.info('Connecting ...', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
    .then( () => logger.info("connected to MongoDB") )
    .catch( (error) => logger.error("error connecting to MongoDB: ", error.message) )

const app = express()
app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)
app.use('/api/users', usersRouter)
app.use('/api/blogs', Router)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app