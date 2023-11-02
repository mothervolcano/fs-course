import express from 'express';
import patientDataValidator from '../utils/patientDataValidator';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {

	res.send(patientService.getAllPublic());
});

router.post('/', (req, res) => {

	console.log('new patient data', req.body);
	const newPatient = patientDataValidator( req.body );

	const addedPatient = patientService.add( newPatient );

	res.send(addedPatient);

});

export default router;