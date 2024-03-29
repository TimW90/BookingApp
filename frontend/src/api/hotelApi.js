import { api } from './api';

const uri = 'hotels';

export const postHotel = async (hotelData) => {
  const response = await api.post(uri, hotelData);
  return response.data;
};

export const getHotels = async (params) => {
  try {
    const response = await api.get(`${uri}/get`, { params });
    return response.data;
  } catch (error) {
    console.error('Failed to fetch hotels', error);
    throw error;
  }
};

export const updateHotel = async (hotelId, hotelData) => {
  const response = await api.put(`${uri}/${hotelId}`, hotelData);
  return response.data;
};

export const deleteHotel = async (hotelId) => {
  await api.delete(`${uri}/${hotelId}`);
};

export const getLocations = async () => {
  const response = await api.get(`${uri}/locations`);
  return response.data;
};

export const getHotelById = async (hotelId) => {
  const response = await api.get(`${uri}/${hotelId}`);
  return response.data;
};
