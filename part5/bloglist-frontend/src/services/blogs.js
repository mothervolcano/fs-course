import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const setToken = (newToken) => {
  
  token = `bearer ${newToken}`

}

const getAll = async () => {

  const config = {

    headers: { Authorization: token }
  }

  console.log('@blogsService -> token: ', token)

  const response = await axios.get( baseUrl, config )

  return response.data
}

const create = async (blogData) => {

  const config = {

    headers: { Authorization: token }
  }

  const response = await axios.post( baseUrl, blogData, config )

  return response.data
}


const update = async (blogData) => {

  const config = {

    headers: { Authorization: token }
  }

  const response = await axios.put( `${baseUrl}/${blogData.id}`, blogData, config )

  return response.data
}

const deleteEntry = async (id) => {

  const config = {

    headers: { Authorization: token }
  }

  const response = await axios.delete( `${baseUrl}/${id}`, config )

  return response.data
}

export default { setToken, getAll, create, update, deleteEntry }