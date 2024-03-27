import DetailImage from '../images/DetailImage';
import ErrorMessage from '../alerts/ErrorMessage';
import { useEffect } from 'react';
import { useAuth } from '../auth/AuthProvider';
import LoadingSpinner from '../common/LoadingSpinner';
import { postBooking } from '@/api/bookingApi';
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

const BookingConfirmation = ({ roomType }) => {
  const { user } = useAuth();
  const { roomSearchParams } = useSearchParams();
  const { togglePopup } = usePopup();
  const navigate = useNavigate();
  const {
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: roomSearchParams,
    resolver: yupResolver(requiredDatesSchema),
  });

  console.log(roomType);

  const onConfirm = async (data) => {
    try {
      const bookingDetails = {
        hotelRoomTypeId: roomType.id,
        userEmail: user.sub,
        checkInDate: roomSearchParams.checkInDate,
        checkOutDate: roomSearchParams.checkOutDate,
      };
      console.log(bookingDetails);

      const newBooking = await postBooking(bookingDetails);
      togglePopup();
      navigate('/my-bookings');

      console.log(newBooking);
    } catch (error) {
      console.error('Error while trying to book', error);
    }
  };

  useEffect(() => {
    reset(roomSearchParams); // when parameters are updated we reset the values to the updates ones
  }, [roomSearchParams, reset]);

  if (!roomType) return <LoadingSpinner />;
  return (
    <form>
      <div className="prose p-4 max-w-md mx-auto">
        <h2>Confirm Booking</h2>
        <div className="mb-4">
          <h3>{roomType.name}</h3>
          <p>{roomType.description}</p>
          <p>Price: €{roomType.price}</p>
        </div>
        <div className="flex flex-col justify-between items-center mt-4">
          <DetailImage image={roomType.base64Images[0]?.base64Image} />

          {!user && (
            <ErrorMessage message="Create an account or login to book a Hotel Room!" />
          )}

          <button
            className="btn btn-secondary py-2"
            onClick={handleSubmit(onConfirm)}
            type="submit"
          >
            Confirm Booking
          </button>
          <div className="flex">
            {<ErrorMessage message={errors.checkInDate?.message} />}
            {<ErrorMessage message={errors.checkOutDate?.message} />}
            {<ErrorMessage message={errors.root?.message} />}
          </div>
        </div>
      </div>
    </form>
  );
};

export default BookingConfirmation;
