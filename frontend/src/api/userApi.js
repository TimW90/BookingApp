import { api } from './api';

export const postUser = (userData) => {
  console.table(userData);
  api.post('/users', userData);
};

export const fetchUser = (id) => {
  return api.get(`/users/${id}`);
};

export const loginUser = (loginRequest) => {
  return api.post('/auth', loginRequest);
};
