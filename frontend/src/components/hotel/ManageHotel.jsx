import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { number, object, string, mixed } from 'yup';
import ErrorMessage from '../alerts/ErrorMessage';
import { usePopup } from '../popup/PopupContext';
import PropTypes from 'prop-types';
import LoadingSpinner from '../common/LoadingSpinner';
import useLocations from '@/hooks/useLocations';
import { useHotels } from './HotelContext';
import { convertToBase64 } from '../images/ImageUtil';
import Form from '@/form/Form';
import Input from '@/form/Input';

const hotelSchema = object().shape({
  name: string().required('Name is a required field'),
  rating: number()
    .required('Rating is a required field')
    .positive('Rating should be one or more')
    .max(5, 'Rating should be five or less'),
  location: string().required('Location is a required field'),
  image: mixed(),
  description: string()
    .required('Description is a required field')
    .min(15, 'Description should be a minimum of 15 characters'),
});

/*
This component "manages" hotel if an hotel is provided the form gets reset with the values of the provided hotel, 
then onSubmit handleUpdateHotel function gets called.
If no hotel is provided the form is empty and the handleAddHotel functions gets called with the provided form values.
*/
const ManageHotel = ({ hotel }) => {
  const {
    register,
    setError,
    watch,
    reset,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm({
    resolver: yupResolver(hotelSchema),
  });

  const [imagePreview, setImagePreview] = useState('');
  const previewImage = watch('image');
  const locations = useLocations();
  const { togglePopup } = usePopup();
  const { handleAddHotel, handleUpdateHotel } = useHotels();

  useEffect(() => {
    if (previewImage && previewImage.length > 0) {
      const file = previewImage[0];
      setImagePreview(URL.createObjectURL(file));
    }
  }, [previewImage]);

  useEffect(() => {
    reset();
  }, [reset, isSubmitSuccessful]);

  useEffect(() => {
    if (hotel) {
      hotel.rating = hotel.starRating.toString();
      reset(hotel);

      // Files can't be set for security reasons so this shows the current image as a preview
      if (hotel.base64Image) {
        setImagePreview(hotel.base64Image);
      }
    }
  }, [hotel, reset]);

  const onSubmit = async (hotelData) => {
    console.table(hotelData);
    try {
      if (hotelData.image && hotelData.image[0]) {
        const base64String = await convertToBase64(hotelData.image[0]);
        hotelData.base64Image = base64String;
      }

      if (hotel) {
        await handleUpdateHotel(hotel.id, hotelData);
      } else {
        await handleAddHotel(hotelData);
      }

      setImagePreview('');
      togglePopup();
    } catch (error) {
      console.error(error);
      let errorMessage =
        'An unexpected error occurred. Please try again later.';

      if (error.response.status === 409) {
        errorMessage = `Hotel with name ${hotelData.name} already exists`;
      }

      setError('root', { message: errorMessage });
    }
  };

  return (
    <div className="card shrink-0 w-full max-w-sm bg-base-100 prose lg:prose-md">
      <h1 className="m-0">{hotel ? 'Update Hotel' : 'Add Hotel'}</h1>

      {imagePreview && <img src={imagePreview} alt="hotel preview image" />}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            className="input input-bordered"
            type="text"
            placeholder="Name..."
            {...register('name')}
            autoComplete="name"
          />
        </div>

        {/* <Input register={register} name="Name" aria-label="name-input" /> */}
        {errors.name && <ErrorMessage message={errors.name.message} />}

        <div className="form-control">
          <label className="label">
            <span className="label-text">Location</span>
          </label>
          <select
            className="select select-bordered"
            {...register('location')}
            defaultValue=""
          >
            <option disabled value="">
              Location...
            </option>
            {locations.map((location) => (
              <option key={location}>{location}</option>
            ))}
          </select>
          {errors.location && (
            <ErrorMessage message={errors.location.message} />
          )}
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">Rating</span>
          </label>
          <div className="rating">
            {[1, 2, 3, 4, 5].map((value) => (
              <input
                key={value}
                type="radio"
                value={value}
                className="mask mask-star-2 bg-orange-400"
                name="star-rating"
                {...register('rating')}
              />
            ))}
          </div>
          {errors.rating && <ErrorMessage message={errors.rating.message} />}
        </div>

        <div className="form-control py-2">
          <label className="label">
            <span className="label-text">Image</span>
          </label>
          <input
            type="file"
            className="file-input file-input-bordered w-full max-w-xs"
            {...register('image')}
          />
          {errors.image && <ErrorMessage message={errors.image.message} />}
        </div>

        <div className="form-control py-2">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea
            className="textarea textarea-bordered"
            placeholder="Description"
            {...register('description')}
          ></textarea>
          {errors.description && (
            <ErrorMessage message={errors.description.message} />
          )}
        </div>

        <div className="form-control mt-6">
          <button type="submit" className="btn m-1">
            {isSubmitting ? <LoadingSpinner /> : 'Confirm'}
          </button>
          {errors.root && <ErrorMessage message={errors.root.message} />}
        </div>
      </form>
    </div>
  );
};

ManageHotel.propTypes = {
  hotel: PropTypes.object,
};

export default ManageHotel;
