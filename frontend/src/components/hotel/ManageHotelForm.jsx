import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string, mixed } from 'yup';
import ErrorMessage from '../alerts/ErrorMessage';
import { usePopup } from '../popup/PopupContext';
import PropTypes from 'prop-types';
import useLocations from '@/hooks/useLocations';
import { useHotels } from './HotelContext';
import { convertToBase64 } from '../images/ImageUtil';
import Form from '@/form/Form';
import Input from '@/form/Input';
import Select from '@/form/Select';
import StarRatingInput from '@/form/StarRatingInput';
import FileInput from '@/form/FileInput';
import TextArea from '@/form/TextArea';
import SubmitButton from '@/form/SubmitButton';

const hotelSchema = object().shape({
  name: string().required('Name is a required field').default(''),
  starRating: string()
    .required('Rating is a required field')
    .oneOf(['1', '2', '3', '4', '5'], 'Invalid star rating') // Ensure it's one of the valid strings
    .default('1'),
  location: string().required('Location is a required field').default(''),
  image: mixed(),
  description: string()
    .required('Description is a required field')
    .min(15, 'Description should be a minimum of 15 characters')
    .default(''),
});

/*
This component "manages" hotel if an hotel is provided the form gets reset with the values of the provided hotel, 
then onSubmit handleUpdateHotel function gets called.
If no hotel is provided the form is empty and the handleAddHotel functions gets called with the provided form values.
*/
const ManageHotelForm = ({ hotel }) => {
  console.log(hotel);
  console.log(hotelSchema.cast(hotel));

  const {
    register,
    setError,
    watch,
    reset,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm({
    defaultValues: hotel || hotelSchema.cast(),
    resolver: yupResolver(hotelSchema),
  });

  const [imagePreview, setImagePreview] = useState('');
  const previewImage = watch('image');
  const locations = useLocations();
  const { togglePopup } = usePopup();
  const { handleAddHotel, handleUpdateHotel } = useHotels();
  const { isPopupOpen } = usePopup();

  useEffect(() => {
    if (previewImage && previewImage.length > 0) {
      const file = previewImage[0];
      setImagePreview(URL.createObjectURL(file));
    }
  }, [previewImage]);

  useEffect(() => {
    if (!isPopupOpen) {
      reset();
    }
  }, [reset, isSubmitSuccessful, isPopupOpen]);

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

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          register={register}
          name="name"
          aria-label="label-input"
          errors={errors}
        />

        <Select
          options={locations}
          register={register}
          errors={errors}
          name="location"
          aria-label="location-input"
        />

        <StarRatingInput
          register={register}
          name="starRating"
          errors={errors}
        />

        <FileInput register={register} name="image" errors={errors} />
        <TextArea register={register} name="description" errors={errors} />
        <SubmitButton isLoading={isSubmitting}>Confirm</SubmitButton>

        {errors.root && <ErrorMessage message={errors.root.message} />}
      </Form>
    </div>
  );
};

ManageHotelForm.propTypes = {
  hotel: PropTypes.object,
};

export default ManageHotelForm;
