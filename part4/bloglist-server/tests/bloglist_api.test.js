const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const Blog = require('../models/blog')


describe('when there is initially one user in db', () => {

	beforeEach( async () => {

		await User.deleteMany({})

		const passwordHash = await bcrypt.hash('abracadabra', 10)
		const user = new User({ username: 'root', passwordHash })

		await user.save()
	})

	test('new user creation with a non-existing username', async () => {

		const usersAtStart = await helper.usersInDb()

		const newUser = {

			username: 'rebel99',
			name: 'Han Solo',
			password: 'thisguessedshallnot'
		}

		await api
			.post('/api/users')
			.send(newUser)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toHaveLength(usersAtStart.length + 1 )

		const savedUsername = usersAtEnd[usersAtEnd.length - 1 ].username
		expect(savedUsername).toBe(newUser.username)
	})

	test('new user creation with existing username', async () => {

		const usersAtStart = await helper.usersInDb()

		const newUser = {

			username: 'root',
			name: 'Superuser',
			password: 'igotthepower'
		}


		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/)

		
		expect(result.body.error).toContain('expected `username` to be unique')

		const usersAtEnd = await helper.usersInDb()
		expect(usersAtEnd).toEqual(usersAtStart)
	})
})


describe('when an existing user logs in', () => {

	beforeEach( async () => {

		await User.deleteMany({})

		for ( const userData of helper.initialUsers ) {

			const saltRounds = 10
			const passwordHash = await bcrypt.hash( userData.password, saltRounds )

			const user = new User({
		
				username: userData.username,
				name: userData.name,
				passwordHash
			})

			await user.save()
		}
	})

	test('correct password is validated and authentication token is generated', async () => {

		const registredUser = {

			username: 'edo',
			password: 'obladioblada'
		}

		const result = await api
			.post('/api/login')
			.send(registredUser)
			.expect(200)
			.expect('Content-Type', /application\/json/)

		expect(result.body.token).toBeDefined()
		expect(result.body.token.length).toBeGreaterThan(10)
		expect(process.env.SECRET).toBe('tokengenerationkey')

	})
})



// beforeEach( async () => {

// 	await Blog.deleteMany({})

// 	const firstEntries = helper.initialBlogs.map( blogData => new Blog(blogData))
// 	const promiseArray = firstEntries.map( blog => blog.save() )
// 	await Promise.all(promiseArray)

// })

beforeEach( async () => {

	await User.deleteMany({})

	for ( const userData of helper.initialUsers ) {

		const saltRounds = 10
		const passwordHash = await bcrypt.hash( userData.password, saltRounds )

		const user = new User({
	
			username: userData.username,
			name: userData.name,
			passwordHash
		})

		await user.save()
	}

	await Blog.deleteMany({})

	for ( const blogData of helper.initialBlogs ) {

		let newBlogEntry = new Blog(blogData)
		await newBlogEntry.save() 
	}

})


describe('when the DB is not empty', () => {

	test('all blogs are returned', async () => {

		const result = await api.get('/api/blogs')
		expect(result.body).toHaveLength(helper.initialBlogs.length)
	})


	test('blogs are returned as json', async () => {

		await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/)
	})

	test('all blogs have an id property', async () => {

		const blogs = await helper.blogsInDb()

		for ( const blog of blogs ) {
			expect(blog.id).toBeDefined()
		}
	})

	test('the first blog is about JavaScript Closures', async () => {

		const result = await api.get('/api/blogs')
		expect(result.body[0].title).toBe('Understanding JavaScript Closures')
	})

	test('a specific blog is in the DB', async () => {
	
		const result = await api.get('/api/blogs')
	
		const titles = result.body.map( b => b.title )
		expect(titles).toContain('An Introduction to Machine Learning')
	})
})


describe('retrieving a specific blog entry', () => {

	test('a specific blog entry can be retrieved', async () => {

		const blogs = await helper.blogsInDb()

		const blogToView = blogs[0]

		const resultBlog = await api
			.get(`/api/blogs/${blogToView.id}`)
			.expect(200)
			.expect('Content-Type', /application\/json/)

		expect(resultBlog.body).toEqual(blogToView)

	})

	test('fails with statuscode 404 if blog entry does not exist', async () => {

		const validNonexistingId = await helper.nonExistingId()

		await api
			.get(`/api/blogs/${validNonexistingId}`)
			.expect(404)
	})


	test('fails with statuscode 400 if id is invalid', async () => {

		const invalidId = '4xc5445fgs526600'

		await api
			.get(`/api/blogs/${invalidId}`)
			.expect(400)
	})
})


describe('adding a new blog entry', () => {

	test('a blog entry is correctly added', async () => {
	
		const loggedUser = {

			username: 'edo',
			password: 'obladioblada'
		}

		const userResult = await api
			.post('/api/login')
			.send(loggedUser)

		const token = userResult.body.token;

		const newBlogEntry = {
	
			title: "Exploring the DOM",
	    	author: "Nancy Williams",
	    	url: "http://example.com/exploring-dom",
	    	likes: 50
		}
	
		const result = await api
			.post('/api/blogs')
			.set('Authorization', `bearer ${token}`)
			.send(newBlogEntry)
			.expect(201)
			.expect('Content-Type', /application\/json/)
	
	
		// blog data was sent correctly
		expect(result.body).toHaveProperty('title', 'Exploring the DOM')
		expect(result.body).toHaveProperty('author', 'Nancy Williams')
		expect(result.body).toHaveProperty('url', 'http://example.com/exploring-dom')
		expect(result.body).toHaveProperty('likes', 50)
	
		// is added to the DB and added only once
		const blogsAtEnd = await helper.blogsInDb()
		expect(blogsAtEnd).toHaveLength( helper.initialBlogs.length + 1 )
	
		// all data was saved correctly and can be accessed as expected
		const addedBlog = blogsAtEnd[ helper.initialBlogs.length ]
		expect( addedBlog.title ).toBe( newBlogEntry.title )
		expect( addedBlog.author ).toBe( newBlogEntry.author )
		expect( addedBlog.url ).toBe( newBlogEntry.url )
		expect( addedBlog.likes ).toBe( newBlogEntry.likes )
	
	})

	test('a blog entry is added but token is missing', async () => {

		const token = null;

		const newBlogEntry = {
	
			title: "Exploring the DOM",
	    	author: "Nancy Williams",
	    	url: "http://example.com/exploring-dom",
	    	likes: 50
		}
	
		const result = await api
			.post('/api/blogs')
			.set('Authorization', `bearer ${token}`)
			.send(newBlogEntry)
			.expect(401)
			.expect('Content-Type', /application\/json/)

	})

	test('a blog entry is added but request is formed without a token', async () => {

		const newBlogEntry = {
	
			title: "Exploring the DOM",
	    	author: "Nancy Williams",
	    	url: "http://example.com/exploring-dom",
	    	likes: 50
		}
	
		const result = await api
			.post('/api/blogs')
			.send(newBlogEntry)
			.expect(400)
			.expect('Content-Type', /application\/json/)

	})

	test('a blog entry without the likes property defaults to 0', async () => {

		const loggedUser = {

			username: 'edo',
			password: 'obladioblada'
		}

		const userResult = await api
			.post('/api/login')
			.send(loggedUser)

		const token = userResult.body.token;

		const newBlogEntry = {

			title: "Deep Dive into CSS Grids",
	    	author: "Daniel Kim",
	    	url: "http://example.com/css-grids"
		}

		const result = await api

			.post('/api/blogs')
			.set('Authorization', `bearer ${token}`)
			.send(newBlogEntry)
			.expect(201)
			.expect('Content-Type', /application\/json/)

		expect(result.body).toHaveProperty('likes', 0)

	})

	test('blog entry without title is not added', async () => {

		const newBlogEntry = {

		    author: "Elena Rodriguez",
		    url: "http://example.com/web-security",
		    likes: 300
	  	}

	  	// responds with 400 Bad Request
	  	await api
	  		.post('/api/blogs')
	  		.send(newBlogEntry)
	  		.expect(400)

	  	// is not added to the DB
	  	const blogsAtEnd = await helper.blogsInDb()
	  	expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

	})

	test('blog entry without url is not added', async () => {

		const newBlogEntry = {

		   	title: "Getting Started with GraphQL",
		    author: "Chris Lee",
		    likes: 120
	  	}

	  	// respondes with 400 Bad Request
	  	await api
	  		.post('/api/blogs')
	  		.send(newBlogEntry)
	  		.expect(400)

	  	// is not added to the DB
	  	const blogsAtEnd = await helper.blogsInDb()
	  	expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

	})


})


describe('when a user is logged in', () => {

	test('a logged user adds a blog', async () => {

		const loggedUser = {

			username: 'edo',
			password: 'obladioblada'
		}

		const userResult = await api
			.post('/api/login')
			.send(loggedUser)

		const token = userResult.body.token;

		const newBlog = {
	
			title: "Exploring the DOM",
	    	author: "Nancy Williams",
	    	url: "http://example.com/exploring-dom",
	    	likes: 50
		}

		await api
			.post('/api/blogs')
			.set('Authorization', `bearer ${token}`)
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/)

	})

})


afterAll( async () => {

	await mongoose.connection.close()
})


