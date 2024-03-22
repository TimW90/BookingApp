import { api } from './api';

const uri = 'rooms';

export const getRooms = async () => {
  const response = await api.get(uri);
  return response.data;
};

export const getRoomTypes = async () => {
  const response = await api.get(`${uri}/types`);
  return response.data;
};

export const postRoom = async (roomData) => {
  try {
    console.log('posting room');
    console.log(roomData);
    delete roomData.image;
    const response = await api.post(uri, roomData);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error while trying to post a new room', error.response.data);
  }
};
