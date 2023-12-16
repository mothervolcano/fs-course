import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'


export const getAnecdotes = async () => {

	return await axios.get(baseUrl).then( (response) => response.data )
}

export const createAnecdote = async ( newEntry ) => {

	return await axios.post(baseUrl, newEntry).then( (response) => response.data )
}

export const updateAnecdote = async ( updatedEntry ) => {

	return await axios.put(`${baseUrl}/${updatedEntry.id}`, updatedEntry).then( (response) => response.data )
}