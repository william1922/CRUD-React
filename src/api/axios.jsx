import axios from 'axios'
const instance = axios.create({
    baseURL: process.env.REACT_APP_DATA_BASE,
    timeout: 1000,
    headers: {'Content-type' : 'application/json'},
})

export default instance