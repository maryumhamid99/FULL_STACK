const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  const listWithMultipleBlogs = [
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

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.countLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('when list has multiple blogs, equals the likes of that', () => {
    const result = listHelper.countLikes(listWithMultipleBlogs)
    expect(result).toBe(36)
  })
})