import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const request = axios.get(baseUrl)
  const response = await request
  return response.data
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const edit = async (id, newBlogObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newBlogObject)
  const response = await request
  return response.data
}

const remove = async (id, removableBlogObject) => {
  const request = axios.delete(`${baseUrl}/${id}`, removableBlogObject)
  const response = await request
  return response.data
}

const getOne = async (id) => {
  const request = axios.get(`${baseUrl}/${id}`)
  const response = await request
  return response.data
}

const getComments = async (id) => {
  const request = axios.get(`${baseUrl}/${id}/comments`)
  const response = await request
  return response.data
}

export default { getAll, create, setToken, edit, remove, getOne, getComments }