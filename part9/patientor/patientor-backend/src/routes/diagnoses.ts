import express from 'express';
import diagnosisService from '../services/diagnosisService';

const router = express.Router();

router.get('/', (_req, res) => {
	res.send(diagnosisService.getAll());
})

router.get('/codes', (_req, res) => {

	try {

		res.send(diagnosisService.getCodes());

	} catch ( error: unknown ) {

		let errorMessage = 'Something went wrong.';
		if (error instanceof Error) {
			errorMessage += ' Error: ' + error.message;
		}
		console.log('ERROR @server: ', error);
		res.status(400).send(errorMessage)
	}

})

export default router;