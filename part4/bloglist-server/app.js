const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const config = require('./utils/config')
const loginRouter = require('./controllers/loginRouter')
const usersRouter = require('./controllers/usersRouter')
const blogsRouter = require('./controllers/blogsRouter')
const middleware = require('./utils/middleware')
const { info, error, separator } = require('./utils/logger')

mongoose.set('strictQuery', false)
info('connecting to database: ', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(() => {
    separator('.')
    info('connected!')
    separator('.')
  })
  .catch((err) => {
    error(`error connecting to ${config.MONGODB_URI}`, err.message)
  })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
app.use('/api/blogs', blogsRouter)

if ( process.env.NODE_ENV === 'test' ) {

  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)


module.exports = app