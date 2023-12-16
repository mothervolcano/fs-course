import { v1 as uuid } from 'uuid';
import patientData from '../../data/patients';
import { NewPatient, NonSensitivePatient, Patient, Entry, NewEntry } from '../types'


const getAll = (): Patient[] => {

	return patientData;
}

const getAllPublic = (): NonSensitivePatient[] => {

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

const getById = (id: string): Patient | null => {

	const patient = patientData.find( (p) => p.id === id );

	return patient ? patient : null
}

const add = ( dataObj: NewPatient ): Patient => {

	const newPatientData = {

		...dataObj,
		id: uuid(),
		entries: []
	}

	return newPatientData;
}

const addEntry = ( dataObj: NewEntry ): Entry => {

	const newEntryData = {

		...dataObj,
		id: uuid()
	}

	return newEntryData;
}


export default {

	getAll,
	getAllPublic,
	getById,
	add,
	addEntry
}