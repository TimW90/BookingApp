import api from './api';

const uri = 'rooms';

export const getRooms = async () => {
  const response = await api.get(uri);
  return response.data;
};
