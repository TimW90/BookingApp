import { useState, useEffect } from 'react';
import { fetchBookingsByUsername } from '@/api/bookingApi';
import LoadingSpinner from '../common/LoadingSpinner';
import { useAuth } from '../auth/AuthProvider';

const UserBookings = () => {
  const [bookings, setBookings] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchUserBookings = async () => {
      if (user) {
        const fetchedBookings = await fetchBookingsByUsername(user.sub);
        setBookings(fetchedBookings);
        console.log(fetchedBookings);
      }
    };

    fetchUserBookings();
  }, [user]);

  return (
    <div className="overflow-x-auto">
      {bookings.length > 0 ? (
        <table className="table table-zebra">
          <caption>Your bookings</caption>
          {/* head */}
          <thead>
            <tr>
              <th>Hotel Name</th>
              <th>Room</th>
              <th>Check-in</th>
              <th>Check-out</th>
              <th>Price per Night</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking) => (
              <tr key={booking.id}>
                <td>{booking.hotelName}</td>
                <td>{booking.room.name}</td>
                <td>{booking.checkIn}</td>
                <td>{booking.checkOut}</td>
                <td>{booking.room.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No bookings found.</p>
      )}
    </div>
  );
};

export default UserBookings;
