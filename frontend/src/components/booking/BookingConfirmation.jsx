import DetailImage from '../images/DetailImage';
import ErrorMessage from '../alerts/ErrorMessage';
import { useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthProvider';
import LoadingSpinner from '../common/LoadingSpinner';

const BookingConfirmation = ({ room }) => {
  const { user } = useAuth();

  const onConfirm = async () => {
    try {
      const newBooking = postBooking({ ...room, user });
      console.log(newBooking);
    } catch (error) {
      console.error('Error while trying to book', error);
    }
  };

  if (!room) return <LoadingSpinner />;

  return (
    <>
      <div className="prose p-4 max-w-md mx-auto">
        <h2>Confirm Booking</h2>
        <div className="mb-4">
          <h3>{room.name}</h3>
          <p>{room.description}</p>
          <p>Price: €{room.price}</p>
        </div>
        <div className="flex flex-col justify-between items-center mt-4">
          <DetailImage image={room.base64Images[0].base64Image} />

          {!user && (
            <ErrorMessage message="Create an account or login to book a room!" />
          )}

          <button className="btn btn-secondary py-2" onClick={onConfirm}>
            Confirm Booking
          </button>
        </div>
      </div>
    </>
  );
};

export default BookingConfirmation;
