import { api } from './api';

const uri = 'bookings';

export const fetchBookingsByUsername = async (username) => {
  try {
    const result = await api.get(`/${uri}/users/${username}`);
    return result.data;
  } catch (error) {
    console.error('Error fetching user bookings', error);
  }
};

export const postBooking = async (bookingDetails) => {
  try {
    const result = await api.post(uri, bookingDetails);
    return result.data;
  } catch (error) {
    console.error('Error posting new booking: ');
  }
};

export const cancelBookingById = async (bookingId) => {
  try {
    await api.delete(`${uri}/${bookingId}`);
  } catch (error) {
    console.error('Error cancelling booking');
  }
};
