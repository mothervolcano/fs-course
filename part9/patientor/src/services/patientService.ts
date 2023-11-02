import { v1 as uuid } from 'uuid';
import patientData from '../../data/patients';
import { NewPatient, PatientPublic, Patient } from '../types'


const getAll = (): Patient[] => {

	return patientData;
}

const getAllPublic = (): PatientPublic[] => {

	return patientData.map((n) => {
		return { 
			id: n.id, 
			name: n.name, 
			dateOfBirth: n.dateOfBirth, 
			gender: n.gender, 
			occupation: n.occupation
		}
	});
}

const add = ( dataObj: NewPatient ): PatientPublic[] => {

	const newPatientData = {

		...dataObj,
		id: uuid()
	}

	return patientData.concat(newPatientData);
}


export default {

	getAll,
	getAllPublic,
	add
}