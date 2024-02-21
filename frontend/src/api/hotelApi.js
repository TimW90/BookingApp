import api from '@/api/api';

const uri = 'hotels';

export const postHotel = async (hotel) => {
  const response = await api.post(`${uri}`, hotel);
  return response.data;
};
