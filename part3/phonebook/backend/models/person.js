const mongoose = require('mongoose');

mongoose.set('strictQuery',false);

const url = process.env.MONGODB_URI;


mongoose.connect(url)
	.then(result => {

		console.log('Connected to MongoDB');

	})
	.catch((error) => {

		console.log('Unable to connect to MongoDB', error.message );
	});


const phoneNumberValidator = (value) => {

	return /^\d{2,3}-\d{5,}$/.test(value);
}

const personSchema = new mongoose.Schema({

	name: { 
		type: String, 
		minLength: 3, 
		required: true 
	},

	number: { 
		type: String, 
		minLength: 8,
		validate: {
			validator: phoneNumberValidator,
			message: props => `${props.value} is not a valid phone number`
		},
		required: [true, 'Phone number is required']
	}

});

personSchema.set('toJSON',{

	transform: (document, returnedObject) => {

		returnedObject.id = returnedObject._id.toString();
		delete returnedObject._id;
		delete returnedObject.__v;
	}
});

module.exports = mongoose.model('Person', personSchema);