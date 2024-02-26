import api from './api';

const uri = 'hotels';

export const postHotel = async (formData) => {
  console.log(formData);
  const response = await api.post(uri, formData);
  return response.data;
};

export const getHotels = async () => {
  const response = await api.get(uri);
  return response.data;
};

export const getLocations = async () => {
  const response = await api.get(`${uri}/locations`);
  return response.data;
};
