import axios from 'axios';

const apiBaseUrl = 'http://localhost:8080/api/v1/';

const api = axios.create({
  baseURL: apiBaseUrl,
});

const setJwtHeader = (jwtToken) => {
  api.defaults.headers.common.Authorization = `Bearer ${jwtToken}`;
};

const jwt = localStorage.getItem('token');
if (jwt) setJwtHeader(jwt);

export { api, setJwtHeader };
