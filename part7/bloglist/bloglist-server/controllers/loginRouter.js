const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')
const { response } = require('express')

loginRouter.post('/', async ( request, response ) => {

	const { username, password } = request.body

	const user = await User.findOne({ username })

	//--------------------------------------------
	// Validate credentials

	if ( username.length < 3 ) {

		return response.status(400).json({

			error: 'username must be at least 3 characters long'
		})
	}

	if ( password.length < 3 ) {

		return response.status(400).json({

			error: 'password must be at least 3 characters long'
		})
	}

	const isPasswordCorrect = user === null 
		? false
		: await bcrypt.compare( password, user.passwordHash )

	if ( !isPasswordCorrect ) {

		return response.status(401).json({
			error: 'invalid username or password'
		})
	}

	//-------------------------------------------
	// Generate token

	const userForToken = {

		username: user.username,
		id: user.id
	}

	const token = jwt.sign( userForToken, process.env.SECRET, { expiresIn: 60*60 } )

	// console.log('----> token: ', token)

	response
		.status(200)
		.send( { token, username: user.username, name: user.name } )

})


module.exports = loginRouter