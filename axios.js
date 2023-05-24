import axios from "axios"

const instance = axios.create({
    baseURL : 'https://face-gram.onrender.com'
})

export default instance