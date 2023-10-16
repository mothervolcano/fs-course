const mongoose = require('mongoose');


const personSchema = new mongoose.Schema({

	name: String,
	number: Number
});


const Person = mongoose.model('Person', personSchema);


const runTest = ( args ) => {

	if ( args[3] ) {

		const person = new Person({
			name: args[3],
			number: args[4]
		});

		person.save().then(result => {

			console.log(`Added ${result.name} ( ${result.number} ) to phonebook`);
			mongoose.connection.close();
		});

	} else {

		Person.find({}).then( result => {

			console.log('Phonebook entries:')
			console.log('------------------')

			for ( const entry of result ) {

				console.log('->', entry);
			}

			mongoose.connection.close();

		});
	}
}


if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)

} else {

	const url = `mongodb+srv://eduardo:${process.argv[2]}@mothervolcano.nbfqven.mongodb.net/phonebook?retryWrites=true&w=majority`;

	mongoose.set('strictQuery',false)
	mongoose.connect(url)
	
	runTest( process.argv );
}



