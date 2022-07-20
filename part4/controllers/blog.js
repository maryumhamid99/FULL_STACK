require('express-async-errors')
const Router = require('express').Router()
const Blog = require('../models/blog')

Router.get('', async(request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

Router.post('', async(request, response) => {
    if(!request.body.title)
      response.status(400).json({ error: 'title is missing' })
    else if(!request.body.url)
    response.status(400).json({ error: 'url is missing' })

    else{
      const result = await (new Blog(request.body).save())
      response.status(201).json(result)
    }
})

module.exports = Router