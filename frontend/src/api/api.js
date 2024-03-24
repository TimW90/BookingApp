import axios from 'axios';

const apiBaseUrl = 'http://localhost:8080/api/v1/';

const api = axios.create({
  baseURL: apiBaseUrl,
});

const setJwtHeader = (jwtToken) => {
  api.defaults.headers.common.Authorization = `Bearer ${jwtToken}`;
};

const jwt = sessionStorage.getItem('token');
if (jwt) setJwtHeader(jwt);

const handleError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.error('Detailed error:', error.response.data);
  } else if (error.request) {
    // The request was made but no response was received
    console.error('No response:', error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.error('Error:', error.message);
  }

  throw error;
};

api.interceptors.response.use(
  (response) => response,
  (error) => {
    handleError(error);
  }
);

export { api, setJwtHeader };
