import diagnoseData from '../../data/diagnoses';
import { Diagnosis } from '../types';

const diagnoses: Diagnosis[] = diagnoseData;

const getAll = (): Diagnosis[] => {
	return diagnoses;
}

const getCodes = (): Array<Diagnosis['code']> => {

	return diagnoses.map( n => n.code );
}


export default {
	getAll,
	getCodes
}