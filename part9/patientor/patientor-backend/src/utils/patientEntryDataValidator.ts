import { EntryType, NewEntry, HealthCheckRating, Discharge, SickLeave, Diagnosis } from "../types";

const assertNever = (value: never): never => {
	throw new Error(`unhandled descriminated member ${JSON.stringify(value)}`)
}

const isString = (input: unknown): input is string => {

	return typeof input === 'string' || input instanceof String;
}

const isNumber = (input: unknown): input is number => {

	return typeof input === 'number';
}

const isDate = (input: string): boolean => {

	return Boolean(Date.parse(input))
}

const isEntryType = (input: string): input is EntryType => {
	return Object.values(EntryType).map(n => n.toString()).includes(input);
}

const isHealthCheckRating = (input: number): input is HealthCheckRating => {
	return Object.values(HealthCheckRating).map(n => n).includes(input)
}

// const parseEntryType = (input: unknown): "Hospital" | "HealthCheck" | "OccupationalHealthcare" => {

// 	if (!input || !isString(input) || !isEntryType(input)) {
// 		throw new Error('Invalid or missing entry type')
// 	}

// 	switch (input) {
// 		case EntryType.Hospital:
// 			return input
// 		case EntryType.HealthCheck:
// 			return input;
// 		case EntryType.OccupationalHealthcare:
// 			return input;
// 		default:
// 			return assertNever(input)
// 	}
// }

const parseEntryType = (input: unknown): EntryType => {

	if (!input || !isString(input) || !isEntryType(input)) {
		throw new Error('Invalid or missing entry type')
	}

	return input;
}

const parseDate = (input: unknown): string => {

	if (!isString(input) || !isDate(input)) {

		throw new Error('Incorrect or missing date input');
	}

	return input
}

const parseDescription = (input: unknown): string => {

	if (!input || !isString(input)) {

		throw new Error('Incorrect or missing description');
	}

	return input
}

const parseSpecialist = (input: unknown): string => {

	if (!input || !isString(input)) {

		throw new Error('Incorrect or missing specialist');
	}

	return input
}

const parseEmployerName = (input: unknown): string => {

	if (!input || !isString(input)) {

		throw new Error('Incorrect or missing employer name');
	}

	return input
}

const parseHealthCheckRating = (input: unknown): HealthCheckRating => {

	if (!input || !isNumber(input) || !isHealthCheckRating(input)) {

		throw new Error('Invalid or missing health check rating');
	}

	return input;
}

const parseCriteria = (input: unknown): string => {

	if (!input || !isString(input)) {

		throw new Error('Incorrect or missing criteria');
	}

	return input
}

const parseDischarge = (input: unknown): Discharge => {

	if (!input || typeof input !== 'object') {
		throw new Error('Incorrect or missing data')
	}

	if ('date' in input && 'criteria' in input) {

		return {
			date: parseDate(input.date),
			criteria: parseCriteria(input.criteria)
		}
	}

	throw new Error('Incorrect discharge data: fields missing')
}

const parseSickLeave = (input: unknown): SickLeave => {

	if (!input || typeof input !== 'object') {
		throw new Error('Incorrect or missing data')
	}

	if ('startDate' in input && 'endDate' in input) {

		return {
			startDate: parseDate(input.startDate),
			endDate: parseDate(input.endDate)
		}
	}

	throw new Error('Incorrect sick leave data: fields missing')
}

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};


const patientDataEntryValidator = (dataObj: unknown): NewEntry => {

	// CHECK 1

	if (!dataObj || typeof dataObj !== 'object') {

		throw new Error('Incorrect or missing data')
	}

	console.log('@SERVER: received entry data: ', dataObj)

	// CHECK 2

	let newEntry;

	if ('type' in dataObj && 'date' in dataObj && 'description' in dataObj && 'specialist' in dataObj) {

		newEntry = {

			date: parseDate(dataObj.date),
			description: parseDescription(dataObj.description),
			specialist: parseSpecialist(dataObj.specialist),
			diagnosisCodes: parseDiagnosisCodes(dataObj)
		}

		const entryType = parseEntryType(dataObj.type)

		switch (entryType) {

			case EntryType.HealthCheck:
				if ('healthCheckRating' in dataObj) {
					return { ...newEntry, type: EntryType.HealthCheck, healthCheckRating: parseHealthCheckRating(dataObj.healthCheckRating) }
				}
				break;
			case EntryType.Hospital:
				if ('discharge' in dataObj) {
					return { ...newEntry, type: EntryType.Hospital, discharge: parseDischarge(dataObj.discharge) }
				}
				break;
			case EntryType.OccupationalHealthcare:
				if ('sickLeave' in dataObj && dataObj.sickLeave) {
					newEntry = { ...newEntry, sickLeave: parseSickLeave(dataObj.sickLeave) }
				}
				if ('employerName' in dataObj) {
					return { ...newEntry, type: EntryType.OccupationalHealthcare, employerName: parseEmployerName(dataObj.employerName) }
				}
				break;
			default:
				return assertNever(entryType)
		}
		
	}

	throw new Error('Incorrect data: fields missing')

}


export default patientDataEntryValidator;

