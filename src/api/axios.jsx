import axios from 'axios'
const instance = axios.create({
    baseURL:"http://localhost:4001",
    timeout: 1000,
    headers: {'Content-type' : 'application/json'}
})

export default instance