import express from 'express'
const app = express();

import calculateBmi from './calculateBmi';

app.get('/hello', (req, res) => {

	console.log('reques: ', req)

	res.send('Hello Full Stack!');

});

app.get('/bmi', (req, res) => {

	const height = Number(req.query.height)
	const weight = Number(req.query.weight)

	if (isNaN(height) && isNaN(weight)) {
		res.status(400).send('Malformatted parameters')
	}

	const result = calculateBmi( height, weight )

	res.json({
		weight: weight,
		height: height,
		bmi: result
	})
})

const PORT = 3003;

app.listen(PORT, () => {

	console.log(`Server running on port ${PORT}`)
})