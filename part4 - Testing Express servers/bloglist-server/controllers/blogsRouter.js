const blogsRouter = require('express').Router()
const { userExtractor } = require('../utils/middleware')
require('express-async-errors')
const Blog = require('../models/blog')

const { info, error } = require('../utils/logger')


// ---------------------------------------------------------
// ROUTES

blogsRouter.get('/', async (request, response) => {

  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  
  response.json(blogs)

})


blogsRouter.get('/:id', async (request, response) => {

  const blog = await Blog.findById(request.params.id)

  console.log('@blogRouter -> requesting blog ', blog)

  if ( ! blog ) { return response.status(404).end() }

  response.json(blog)

})


blogsRouter.delete('/:id', userExtractor, async (request, response) => {

  const blogEntry = await Blog.findById(request.params.id)

  console.log(`-- user id: ${request.user.id} | blog user: ${blogEntry.user}`)

  if ( request.user.id.toString() === blogEntry.user.toString() ) { 

    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()

  } else {

    response.status(401).json( { error: 'Blog entries can only be deleted by the creators' } );

  }

})


blogsRouter.post('/', userExtractor, async (request, response) => {

  if ( ! request.body.title ) { return response.status(400).send('missing title') }
  if ( ! request.body.url ) { return response.status(400).send('missing url') }

  if ( ! request.body.likes ) { request.body.likes = 0 }

  //..........................................

  const blog = new Blog({

    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
    user: request.user.id

  })

  const savedBlog = await blog.save()
  info('Blog saved: ', savedBlog.id)

  request.user.blogs = request.user.blogs.concat(savedBlog.id)
  await request.user.save()

  response.status(201).json(savedBlog)    

})


blogsRouter.put('/:id', async (request, response) => {

  const updatedBlogData = request.body

  const updatedEntry = { ...updatedBlogData, user: updatedBlogData.user.id }

  await Blog.findByIdAndUpdate( 
      request.params.id, 
      updatedEntry, 
      { new: true } )

  response.status(200).end()

})

blogsRouter.post('/:id/comments', async (request, response) => {

  const comment = request.body.comment

  const blog = await Blog.findById(request.params.id)
  console.log('@blogsRouter -> requested blog: ', blog)

  blog.comments = blog.comments.concat(comment)
  const savedBlog = await blog.save()

  if ( ! blog ) { return response.status(404).end() }

  response.status(201).json(savedBlog) 

})


module.exports = blogsRouter

