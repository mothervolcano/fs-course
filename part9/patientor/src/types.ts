export interface Diagnosis {
	code: string;
	name: string;
	latin?: string;
}

export interface Patient {

	id: string;
	name: string;
	dateOfBirth: string;
	ssn: string;
	gender: string;
	occupation: string;
}

export type PatientPublic = Omit<Patient, 'ssn'>
// export type NewPatient = Omit<Patient, 'id'>
export type NewPatient = Pick<Patient, 'name' | 'dateOfBirth' | 'ssn' | 'gender' | 'occupation'>