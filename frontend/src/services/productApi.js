import axios from 'axios';

const API = axios.create({
        baseURL: "https://anaxee-backend.onrender.com/api"
    });

export default API;
