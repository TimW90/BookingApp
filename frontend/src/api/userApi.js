import { api } from './api';

const uri = 'users';

export const postUser = (userData) => {
  console.table(userData);
  return api.post(uri, userData);
};

export const fetchUser = (id) => {
  return api.get(`${uri}/${id}`);
};

export const loginUser = (loginRequest) => {
  return api.post('/auth', loginRequest);
};
