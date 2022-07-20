const Blog = require("../models/blog")
const User = require('../models/user')
const initialBlogs = [
    {
        _id: "5a422aa71b54a676234d17f8",
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    },
    {
        _id: "5a422a851b54a676234d17f7",
        title: "Go to somethign",
        author: "maryum hamid",
        url: "https://google.com/",
        likes: 4,
        __v: 0
    },
    {
        _id: "5a422b3a1b54a676234d17f9",
        title: "go to 1",
        author: "maryum 1",
        url: "https://google.com/",
        likes: 1,
        __v: 0
    },
    {
        _id: "5a422b891b54a676234d17fa",
        title: "Go to somethign",
        author: "maryum hamid",
        url: "https://google.com/",
        likes: 4,
        __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "Go to somethign",
        author: "maryum hamid",
        url: "https://google.com/",
        likes: 4,
        __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Go to somethign",
        author: "maryum hamid",
        url: "https://google.com/",
        likes: 4,
        __v: 0
    }   
  ]

  const Dbblogs = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
  }
  
  const createNewNote = async () => {
    const newBlog = {
        title: 'temp blog',
        author: 'Buket Karakaş',
        url: 'wwwwww',
        likes: 85
      }
    const blog = new Blog(newBlog)
    await blog.save()
  
    return blog._id.toString()
  }
  
  
  const Dbusers = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
  }
  
  
  
  
module.exports = {
    initialBlogs,
    dBblogs,
    createNewNote,
    createNewNote,
    Dbusers
}

