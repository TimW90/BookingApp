import axios from 'axios';

const apiBaseUrl = 'http://localhost:8080/api/v1/';

const api = axios.create({
  baseURL: apiBaseUrl,
});

export default api;
