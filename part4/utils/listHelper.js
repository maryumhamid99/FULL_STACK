const dummy = (blogs) => {
    return 1
}
const countLikes = (blogs) => {
    const reducer = (sum, blog) => { return sum + blog.likes }
    return blogs.length === 0 ? 0 : blogs.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {
    blogs.sort((blog1, blog2) => blog2.likes - blog1.likes)
    const result = {
        title: blogs[0].title,
        likes: blogs[0].likes
    }
    return result
}

const mostBlogs = (blogs) => {
    const authorObj = _.countBy(blogs, 'author')
    let authArray = []
    _.forIn(authorObj, function(value, key){
        authArray=authArray.concat({
            author: key,
            blogs: value
        })
    })
    authArray.sort((a1,a2) => a2.blogs - a1.blogs)
    return authArray[0]
}

module.exports = {
    dummy, countLikes,favoriteBlog, mostBlogs
}