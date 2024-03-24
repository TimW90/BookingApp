import DetailImage from '../images/DetailImage';
import ErrorMessage from '../alerts/ErrorMessage';
import { useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthProvider';
import LoadingSpinner from '../common/LoadingSpinner';
import { postBooking } from '@/api/bookingApi';
import DatePicker from '../searchbar/DatePicker';
import { useHotels } from '../hotel/HotelContext';
import { useForm } from 'react-hook-form';
import { useSearchParams } from '../searchbar/SearchParamsContext';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, date, ref } from 'yup';
import { usePopup } from '../popup/PopupContext';
import { useNavigate } from 'react-router-dom';

const requiredDatesSchema = object().shape({
  checkInDate: date().required('Check-in date is required'),
  checkOutDate: date()
    .required('Check-out date is required')
    .min(ref('checkInDate'), 'Check-out date must be after check-in date'),
});

const BookingConfirmation = ({ room }) => {
  const { user } = useAuth();
  const { searchParams } = useSearchParams();
  const { togglePopup } = usePopup();
  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: searchParams,
    resolver: yupResolver(requiredDatesSchema),
  });

  const onConfirm = async (data) => {
    try {
      const bookingDetails = {
        roomId: room.id,
        userEmail: user.sub,
        checkInDate: searchParams.checkInDate,
        checkOutDate: searchParams.checkOutDate,
      };
      console.log(bookingDetails);

      const newBooking = postBooking(bookingDetails);
      togglePopup();
      console.log(newBooking);
    } catch (error) {
      console.error('Error while trying to book', error);
    }
  };

  useEffect(() => {
    reset(searchParams); // when parameters are updated we reset the values to the updates ones
  }, [searchParams, reset]);

  if (!room) return <LoadingSpinner />;
  return (
    <form>
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

          <button
            className="btn btn-secondary py-2"
            onClick={handleSubmit(onConfirm)}
            type="submit"
          >
            Confirm Booking
          </button>
          {<ErrorMessage message={errors.checkInDate?.message} />}
          {<ErrorMessage message={errors.checkOutDate?.message} />}
          {<ErrorMessage message={errors.root?.message} />}
        </div>
      </div>
    </form>
  );
};

export default BookingConfirmation;
