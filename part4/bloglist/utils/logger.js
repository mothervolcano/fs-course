
const info = (...params) => {

	if ( process.env.NODE_ENV !== 'test' ) {
		
		console.log('(i)', ...params);
	} 
}

const error = (...params) => {

	if ( process.env.NODE_ENV !== 'test' ) {

		console.log('(!)', ...params);
	}
}

const separator = (char) => {

	if ( process.env.NODE_ENV !== 'test' ) {

		console.log('')
		console.log(`${char.repeat(25)}`)
		console.log('')
	}

}

module.exports = { info, error, separator }