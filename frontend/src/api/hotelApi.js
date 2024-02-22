import api from '@/api/api';

const uri = 'hotels';

export const postHotel = async (hotel) => {
  if (hotel && hotel.location) hotel.location = hotel.location.toUpperCase();
  const response = await api.post(`${uri}`, hotel);
  return response.data;
};
