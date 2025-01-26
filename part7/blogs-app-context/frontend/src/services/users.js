import axios from 'axios'
const baseUrl = '/api/users'

const getAllUsers = () => {
  const request = axios.get(baseUrl).then(response => response.data)
  return request
}

const getUser = (username) => {
  const request = axios.get(`${baseUrl}/${username}`)
  return request.then(response => response.data)
}

const create = newObject => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}


export default {getUser, getAllUsers, create}