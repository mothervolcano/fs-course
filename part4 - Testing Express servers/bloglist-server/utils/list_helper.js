const { info } = require('./logger') 

const dummy = (blogs) => {
  
  return 1;
}

const totalLikes = (blogs) => {

	return blogs.reduce((acc, n) => {

		// info('blogs.reduce: ', n.likes )

		return acc + ( n.likes !== undefined ? n.likes : 0 );
	}, 0)
}


const favoriteBlog = (blogs) => {

	const sortedBlogs = blogs.slice().sort(( a, b )=> b.likes-a.likes );

	return sortedBlogs[0];
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}