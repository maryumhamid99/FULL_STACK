require('express-async-errors')
const Router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const middleware = require("../utils/middleware")

Router.get('', async(request, response) => {
  const blogs = await Blog.find({}).populate('user', {username:1, name:1})
   response.json(blogs)
})
const user = request.user
blogsRouter.post('/',middleware.userExtractor, async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)    if(!request.body.title)
      response.status(400).json({ error: 'title is missing' })
    else if(!request.body.url)
    response.status(400).json({ error: 'url is missing' })

    else{
      const user = await User.findById(request.body.user)
      const blog = new Blog({
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        likes: request.body.likes,
        user: user._id
      })
      const result = await (blog).save()
      response.status(201).json(result)
    }
})

blogsRouter.delete('/:id',middleware.userExtractor, async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = request.user
  const blog = await Blog.findById(request.params.id)

  if(blog.user.toString() !== user._id.toString()){
    return response.status(401).json({error: 'Cannot be deleted '})
  }

  if(blog){
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