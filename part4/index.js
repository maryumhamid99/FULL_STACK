require('dotenv').config()
const mongoose = require('mongoose')
const express = require('express')
const http = require('http')
const app = express()
const cors = require('cors')

const schema = new mongoose.Schema({
  author: String,
  title: String,
  url: String,
  likes: Number
})

const Blog = mongoose.model('Blog', schema)

const mongoUrl = process.env.MONGODB_URI
const PORT = process.env.PORT
mongoose.connect(mongoUrl)

app.use(cors())
app.use(express.json())

app.post('/api/blogs', (request, response) => {
    const blog = new Blog(request.body)
  
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
  })

  
app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})