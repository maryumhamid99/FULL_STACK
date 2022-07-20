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
describe("Getting all blogs", () =>{
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

describe("Adding a blog", () => {

})  
})
describe("Posting a blog", () => {
test('a blog without likes set likes to 0', async () => {
    const newBlog = {
        title: 'abc title',
        author: 'abc name',
        url: 'abcurl',
    }
  
    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    expect(response.body.likes).toBe(0)
  
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
  test('blog without url not be be added', async () => {
    const newBlog = {
        title: 'abc title',
        author: 'abc name',
        likes: 24
    }
  
    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  
  
  })
  test('blog without title not be be added', async () => {
    const newBlog = {
        author: 'abc name',
        url: 'abcurl',
        likes: 24
    }
  
    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
      .expect('Content-Type', /application\/json/)
  
  
  })
})
describe("Deleting a blog",  () => {
    test("Inserting and deleting a blog", async () => {
      const idDelete = await helper.createNewNote()
      await api
        .delete(`/api/blogs/${idDelete}`)
        .expect(204)
    })
  })
  
  describe("Updating a blog ",  () => {
    test("with new like number and title", async () => {
      const idTobeUpdated = await helper.createNewNote()
      const newBlog = {
        title: 'abc title',
        author: 'abc name',
        url: 'abcurl',
        likes: 24
      }
      await api
        .put(`/api/blogs/${idTobeUpdated}`)
        .send(newBlog)
        .expect(200)
  
      const updated = (await helper.blogsInDb()).find(r => r.id == idTobeUpdated)
      expect(updated.title).toBe('title updated')
      expect(updated.likes).toBe(24)
    })



})

afterAll(() => {
    mongoose.connection.close()
})