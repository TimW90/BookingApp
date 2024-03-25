import { api } from './api';

const uri = 'hotel-room-types';

export const fetchHotelRoomTypesByHotelId = async (params) => {
  console.log(params);
  try {
    const response = await api.get(`${uri}/availability`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching hotel room types', error);
  }
};
