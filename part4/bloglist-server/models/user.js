const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')


const userSchema = new mongoose.Schema({

	username: {

		type: String,
		minLength: 3,
		required: true,
		unique: true
	},
	name: String,
	passwordHash: String,
	blogs: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Blog'
		}
	]
})

userSchema.plugin(uniqueValidator)


userSchema.set('toJSON', {

	transform: (doc, returnObj) => {

		returnObj.id = returnObj._id.toString()
		delete returnObj._id
		delete returnObj.__v
		delete returnObj.passwordHash
	}
})

module.exports = mongoose.model('User', userSchema)