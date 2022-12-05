import axios from "axios";

const multipartFormData = axios.create({
    baseURL: process.env.REACT_APP_DATA_BASE,
    timeout: 5000,
    headers: {'Content-type' : 'multipart/form-data'},
})

export default multipartFormData