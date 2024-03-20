import { useState, useEffect } from 'react';
import { getBookingsByUserId } from '@/api/bookingApi';
import LoadingSpinner from '../common/LoadingSpinner';

const UserBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchUserBookings = async () => {
      const fetchedBookings = await getBookingsByUserId();
      setBookings(fetchedBookings);
    };

    fetchUserBookings();
  }, []);

  if (!bookings) return <LoadingSpinner />;
  return (
    <div className="prose">
      <h2>Your Bookings</h2>
      {bookings.length > 0 ? (
        <ul>
          {bookings.map((booking) => (
            <li key={booking.id}>
              <h3>{booking.hotel.name}</h3>
              <p>Room: {booking.room.name}</p>
              <p>Check-in: {booking.checkIn}</p>
              <p>Check-out: {booking.checkOut}</p>
              <p>Price per night: ${booking.room.price}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No bookings found.</p>
      )}
    </div>
  );
};

export default UserBookings;
