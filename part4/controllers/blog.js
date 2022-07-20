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

blogsRouter.delete('/:id', async (request, response) => {

  if(await Blog.findById(request.params.id)){
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  response.json(await Blog.findByIdAndUpdate(request.params.id, blog, { new: true }))
  response.status(200).end()

})

module.exports = Router