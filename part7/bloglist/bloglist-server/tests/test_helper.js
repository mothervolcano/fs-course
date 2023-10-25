const User = require('../models/user')
const Blog = require('../models/blog')


const initialUsers = [
	
	{
		username: 'edo',
		name: 'Eduardo Barbosa',
		password: 'obladioblada'
	},

	{
		username: 'doppelganger',
		name: 'Eduardo Barbosa',
		password: 'abracadabra'
	}
]


const initialBlogs = [
	
	{
		title: 'Understanding JavaScript Closures',
		author: 'John Doe',
		url: 'http://example.com/js-closures',
		likes: 31
	},

	{
		title: 'An Introduction to Machine Learning',
		author: 'Jane Smith',
		url: 'http://example.com/ml-intro',
		likes: 0
	},

]


const nonExistingId = async () => {

	const blog = new Blog({ title: 'temporary'})
	await blog.save()
	await blog.deleteOne()

	return blog._id.toString()

}


const blogsInDb = async () => {

	const blogs = await Blog.find({})

	return blogs.map(blog => blog.toJSON())

}

const usersInDb = async () => {

	const users = await User.find({})

	return users.map(user => user.toJSON())

}


module.exports = {

	initialUsers, initialBlogs, nonExistingId, blogsInDb, usersInDb
}