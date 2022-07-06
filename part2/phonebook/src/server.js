import axios from "axios";

const baseUrl = "http://localhost:3001/persons"

const addEntry = newEntry => {
    return axios.post(baseUrl, newEntry).then( response => response.data )
}

const getAll = () => {
    return axios.get(baseUrl).then(response => response.data)
}

const deleteEntry = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
        .then( response => response.data )
        .catch( error => console.log("Failed to delete", error) )
  }


const updateEntry = (id, person) => {
    return axios.put(`${baseUrl}/${id}`, person)
        .then(response => response.data)
}
const exports = {addEntry, getAll, deleteEntry,updateEntry}
export default exports