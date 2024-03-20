import { api } from './api';

const uri = 'bookings';

export const getBookingsByUserId = (userId) => {
  try {
    const result = api.get(`${uri}/${userId}`);
    return result.data;
  } catch (error) {
    console.error('Error fetching bookings', error);
  }
};
