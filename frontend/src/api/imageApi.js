import api from './api';

const uri = 'hotels/image/';

export const getHotelImageById = async (id) => {
  const response = await api.get(`${uri}${id}`);
  return response.data;
};
