import DetailImage from '../images/DetailImage';
import ErrorMessage from '../alerts/ErrorMessage';
import { useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthProvider';
import LoadingSpinner from '../common/LoadingSpinner';
import { postBooking } from '@/api/bookingApi';
import DatePicker from '../searchbar/DatePicker';
import { useHotels } from '../hotel/HotelContext';
import { useForm } from 'react-hook-form';

const BookingConfirmation = ({ room }) => {
  const { user } = useAuth();
  const { params } = useHotels();
  const { register, handleSubmit } = useForm();
  console.log(room.id);

  const onConfirm = async () => {
    try {
      const newBooking = postBooking(room.id, user.sub);
      console.log(newBooking);
    } catch (error) {
      console.error('Error while trying to book', error);
    }
  };

  const onSubmit = (dateData) => {
    console.log(dateData);
  };

  if (!room) return <LoadingSpinner />;
  return (
    <>
      <div className="prose p-4 max-w-md mx-auto">
        <h2>Confirm Booking</h2>
        <form onSubmit={handleSubmit(onSubmit())}>
          <DatePicker register={register} />
        </form>
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
