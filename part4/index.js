const mongoose = require('mongoose')
const express = require('express')
const http = require('http')
const app = express()
const cors = require('cors')

const blogRouter = require('./controllers/blog')
const middleware = require('./utils/middleware')

const config = require('./utils/config')
const logger = require('./utils/logger')

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    logger.info('connected to MongoDB')
  })
  .catch((error) => {
    logger.error('error connecting to MongoDB:', error.message)
  })

app.use(cors())
app.use(middleware.requestLogger)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)
app.use(express.json())
app.use('/api/blogs', blogRouter)


app.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
})