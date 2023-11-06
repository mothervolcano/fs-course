import express from 'express';
import patientEntryDataValidator from '../utils/patientEntryDataValidator';
import patientDataValidator from '../utils/patientDataValidator';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {

	res.send(patientService.getAllPublic());
});

router.get('/:id', (req, res) => {

	res.send(patientService.getById(req.params.id));
})

router.post('/', (req, res) => {

	console.log('new patient data', req.body);
	const newPatient = patientDataValidator(req.body);

	const addedPatient = patientService.add(newPatient);

	res.send(addedPatient);

});

router.post('/:id/entries', (req, res) => {

	try {

		const entryToAdd = patientEntryDataValidator(req.body);

		const addedEntry = patientService.addEntry(entryToAdd);

		res.send(addedEntry)

	} catch (error: unknown) {
		let errorMessage = 'Something went wrong.';
		if (error instanceof Error) {
			errorMessage += ' Error: ' + error.message;
		}
		console.log('ERROR @server: ', error);
		res.status(400).send(errorMessage)
	}

})

export default router;