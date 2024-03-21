import { api } from './api';

const uri = 'bookings';

export const fetchBookingsByUsername = async (username) => {
  console.log(username);
  try {
    const result = await api.get(`${uri}/${username}`);
    return result.data;
  } catch (error) {
    console.error('Error fetching user bookings', error);
  }
};

export const postBooking = async (booking) => {
  try {
    const result = await api.post(`${uri}`, booking);
    return result.data;
  } catch (error) {
    console.error('Error posting new booking', error);
  }
};
