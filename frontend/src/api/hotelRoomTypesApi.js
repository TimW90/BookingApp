import { api } from './api';

const uri = 'hotel-room-types';

export const fetchHotelRoomTypesByHotelId = async (params) => {
  try {
    const response = await api.get(`${uri}/availability`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching hotel room types', error);
  }
};

export const getRoomTypes = async () => {
  const response = await api.get(`${uri}`);
  return response.data;
};

export const postHotelRoomTypes = async (roomData) => {
  try {
    const response = await api.post(uri, roomData);
    return response.data;
  } catch (error) {
    console.error('Error while trying to post a new room', error.response.data);
  }
};
