const mongoose = require("mongoose")
const supertest = require("supertest")
const helper = require("./test_helper")
const app = require("../app")

const api = supertest(app)
const Blog = require("../models/blog")


beforeEach(async () => {
    await Blog.deleteMany({})
    const blogObjects = helper.initialBlogs.map( blog => new Blog(blog) )
    const promiseArray = blogObjects.map( blog => blog.save() )
    await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {
    const response = await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(helper.initialBlogs.length)
})
test('id property of blogs is present', async () => {
    const response = await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
  
    for(blog of response.body){
      expect(blog.id).toBeDefined()
    }
  })

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'abc title',
    author: 'abc name',
    url: 'abcurl',
    likes: 24
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()

  const contents = blogsAtEnd.map(blogt => blogt.title)

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
  expect(contents).toContain(
    'abc name'
  )
})



afterAll(() => {
    mongoose.connection.close()
})