import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:5000/api', // Backend URL
});

export const fetchCompanies = () => API.get('/companies');
