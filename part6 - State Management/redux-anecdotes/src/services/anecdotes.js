import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'


const getAnecdote = async (id) => {

  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const updateAnecdote = async (id, anecdote) => {

  const object = {
    content: anecdote.content,
    votes: anecdote.votes
  }

  const response = await axios.put(`${baseUrl}/${id}`, object)
  return response.data
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  
  const object = { 
    content,
    votes: 0
  }

  const response = await axios.post(baseUrl, object)
  return response.data
}


export default { getAll, createNew, getAnecdote, updateAnecdote }