import axios from 'axios';

const baseUrl = 'http://localhost:3001/persons';

const getAll = () => {

	const request = axios.get(baseUrl);
	return request.then( request => request.data );

}

const addPerson = (entry) => {

	const request = axios.post(baseUrl, entry);
	return request.then( request => request.data );
}

const updatePerson = (id, newEntry) => {

	const request = axios.put(`${baseUrl}/${id}`, newEntry );
	return request.then( request => request.data );
}

const deletePerson = (id) => {

	const request = axios.delete(`${baseUrl}/${id}`);
	return request.then( request => request.data );
}


export default { getAll, addPerson, updatePerson, deletePerson }