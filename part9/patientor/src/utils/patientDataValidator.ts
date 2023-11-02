import { NewPatient } from "../types";

export enum Gender {

	Male = 'male',
	Female = 'female',
	Other = 'other'
}


const isString = (input: unknown): input is string => {

	return typeof input === 'string' || input instanceof String;
}

const isDate = (input: string): boolean => {

	return Boolean(Date.parse(input))
}

const isGender = (input: string): input is Gender => {

	return Object.values(Gender).map( n => n.toString() ).includes(input)
}

const parseName = (input: unknown): string => {

	if ( !input || !isString(input) ) {
		throw new Error('Incorrect or missing name');
	}

	return input;

}

const parseDate = (input: unknown): string => {

	if( !isString(input) || !isDate(input) ) {

		throw new Error('Incorrect or missing date input');
	}

	return input
}

const parseSsn = (input: unknown): string => {

	if (!input || !isString(input) ) {

		throw new Error('Incorrect or missing Social Security number')
	}

	return input;
}

const parseGender = (input: unknown): Gender => {

	if ( !input || !isString(input) || !isGender(input) ) {

		throw new Error('Incorrect or missing gender');
	}

	return input
}

const parseOccupation = (input: unknown) : string => {

	if ( !input || !isString(input) ) {

		throw new Error('Incorrect or missing occupation');
	}

	return input
}


const patientDataValidator = ( dataObj: unknown ): NewPatient => {

	// CHECK 1

	if ( !dataObj || typeof dataObj !== 'object') {

		throw new Error('Incorrect or missing data')
	}

	// CHECK 2

	if ( 'name' in dataObj && 'dateOfBirth' in dataObj && 'gender' in dataObj && 'occupation' in dataObj && 'ssn' in dataObj ) {

		const newPatient = {

			name: parseName( dataObj.name ),
			dateOfBirth: parseDate( dataObj.dateOfBirth),
			ssn: parseSsn( dataObj.ssn ),
			gender: parseGender( dataObj.gender ),
			occupation: parseOccupation( dataObj.occupation )
		}

		return newPatient;	
	}

	throw new Error('Incorrect data: fields missing')

}

export default patientDataValidator;


