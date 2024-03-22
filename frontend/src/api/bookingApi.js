import { api } from './api';

const uri = 'bookings';

export const fetchBookingsByUsername = async (username) => {
  console.log(username);
  try {
    const result = await api.get(`/${uri}/users/${username}`);
    return result.data;
  } catch (error) {
    console.error('Error fetching user bookings', error);
  }
};

export const postBooking = async (roomId, email) => {
  console.log({ roomId, email });
  try {
    const result = await api.post(uri, { roomId, email });
    return result.data;
  } catch (error) {
    console.error('Error posting new booking: ');
  }
};
