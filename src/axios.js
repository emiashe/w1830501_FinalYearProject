//w1830501
// Axios configuration for public and private HTTP requests
import axios from 'axios';
const BASE_URL = 'https://w1830501-finalyear-project-303a39317c7b.herokuapp.com'

export default axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});

