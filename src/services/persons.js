import axios from "axios";
const baseUrl = '/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(res => res.data)
}

const create = (obj) => {
    const request = axios.post(baseUrl, obj)
    return request.then(res => res.data)
}

const deletePerson = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

const update = (id, obj) => {
    const request = axios.put(`${baseUrl}/${id}`, obj)
    return request.then(res => res.data)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, create, deletePerson, update }