import diagnoseData from '../../data/diagnoses';
import { Diagnosis } from '../types';

const diagnoses: Diagnosis[] = diagnoseData;

const getAll = (): Diagnosis[] => {
	return diagnoses;
}


export default {
	getAll
}