import { useState, useEffect } from 'react';
import { fetchBookingsByUsername } from '@/api/bookingApi';
import LoadingSpinner from '../common/LoadingSpinner';
import { useAuth } from '../auth/AuthProvider';
import { FaTrashAlt } from 'react-icons/fa';
import { cancelBookingById } from '@/api/bookingApi';

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

  const handleCancelBookingById = (bookingId) => {
    cancelBookingById(bookingId);
    setBookings((prevBookings) =>
      prevBookings.filter((booking) => booking.id !== bookingId)
    );
  };

  return (
    <>
      {bookings.length > 0 ? (
        <div className="overflow-x-auto">
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
                  <td>{booking.roomName}</td>
                  <td>{booking.checkIn}</td>
                  <td>{booking.checkOut}</td>
                  <td>€{booking.price}</td>
                  <td>
                    <button
                      onClick={() => handleCancelBookingById(booking.id)}
                      className="btn btn-error btn-outline
                     btn-xs"
                    >
                      <FaTrashAlt /> Cancel booking
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="flex w-full justify-center">
          <div className="prose my-8">
            <h1>No bookings yet</h1>
          </div>
        </div>
      )}
    </>
  );
};

export default UserBookings;
