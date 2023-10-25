const mongoose = require('mongoose')

const { info, error, separator } = require('./utils/logger')
const Blog = require('./models/blog')

const addEntry = (args) => {

	if ( args[3] ) {

		const blog = new Blog({

			title: args[3],
			author: args[4],
			url: args[5],
			likes: args[6] ? args[6] : 0
		})

		blog.save()
			
			.then( result => {

				info(`Added ${result.title} to bloglistTest DB`)
				mongoose.connection.close()

			})
			.catch( err => error(err.message))

	} else {

		Blog.find({})
			
			.then( result => {

			separator('.')

			for ( const entry of result ) {

				info(entry)
			}

			separator('.')

			mongoose.connection.close();

			})
			.catch( err => error(err.message) )

	}
}


if ( process.argv.length<3 ) {

	console.log('missing password')
	process.exit(1)

} else {

	const url = `mongodb+srv://eduardo:${process.argv[2]}@mothervolcano.nbfqven.mongodb.net/bloglistTest?retryWrites=true&w=majority`

	mongoose.set('strictQuery', false)
	mongoose.connect(url)

	addEntry( process.argv )

}

