const jwt = require('jsonwebtoken')
const User = require('../models/user')
const { info, error, separator }  = require('./logger')

const requestLogger = ( request, response, next ) => {

	info('method:', request.method)
	info('path:', request.path)
	info('body:', request.body)
	separator('-')
	next()
}


const userExtractor = async ( request, response, next ) => {

  if ( ! request.token ) {

  	return response.status(400).json( { error: 'user token is missing from request' } )

  }

  const decodedToken = jwt.verify( request.token, process.env.SECRET )
  
  if ( !decodedToken.id ) {

    return response.status(401).json( { error: 'token invalid' } )

  }
  
  request.user = await User.findById( decodedToken.id )

  next()
}


const tokenExtractor = ( request, response, next ) => {

	let token

	const authorization = request.get('authorization')

	if ( authorization && authorization.startsWith('bearer ') ) {

		token = authorization.replace('bearer ', '')

	} else {

		token = null
	}

	request.token = token

	next()
}


const unknownEndpoint = (request, response) => {

	response.status(404).send({ error: 'unknown endpoint' })

}


const errorHandler = ( err, request, response, next ) => {

	console.log('@ error handler' , err.message)

	error(err.message)

	if ( err.name === "CastError" ) {

		return response.status(400).send({ error: 'malformed input'})

	} else if ( err.name === "ValidationError" ) {

		return response.status(400).json({ error: err.message})

	} else if ( err.name === "JsonWebTokenError") {

		return response.status(401).json({ error: error.message })

	} else if ( err.name === "TokenExpiredError") {

		return response.status(401).json({

			error: 'token expired'
		})
	}

	next(err)
}

module.exports = {

	requestLogger,
	tokenExtractor,
	userExtractor,
	unknownEndpoint,
	errorHandler
}