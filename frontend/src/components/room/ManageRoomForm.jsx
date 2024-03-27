import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { number, object, string, mixed, array } from 'yup';
import { usePopup } from '../popup/PopupContext';
import { postHotelRoomTypes } from '@/api/hotelRoomTypesApi';
import Input from '@/form/Input';
import Select from '@/form/Select';
import FileInput from '@/form/FileImageInput';
import TextArea from '@/form/TextArea';
import SubmitButton from '@/form/SubmitButton';
import useRoomTypes from '@/hooks/useRoomTypes';
import ErrorMessage from '../alerts/ErrorMessage';
import PropTypes from 'prop-types';
import { convertMultipleToBase64, convertToBase64 } from '../images/ImageUtil';
import Carousel from './Carousel';

const roomSchema = object().shape({
  name: string().required('Name is a required field'),
  type: string().required('Type is a required field'),
  price: number()
    .typeError('Price is a required field')
    .required('Price is a required field')
    .positive('Price should be a positive number'),
  imageFiles: mixed(),
  description: string()
    .required('Description is a required field')
    .min(15, 'Description should be a minimum of 15 characters'),
  amountOfRooms: number()
    .typeError('Quantity is a required field')
    .required('Quantity is a required field')
    .min(1, 'Quantity should be atleast 1'),
});

const ManageRoomForm = ({ hotelId }) => {
  const {
    register,
    setError,
    watch,
    reset,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm({
    resolver: yupResolver(roomSchema),
  });

  const { togglePopup } = usePopup();
  const roomTypes = useRoomTypes();
  const [carouselPreview, setCarouselPreview] = useState([]);
  const previewImages = watch('imageFiles');

  useEffect(() => {
    const convertImages = async () => {
      if (previewImages) {
        const images = await convertMultipleToBase64(previewImages);
        setCarouselPreview(images);
      }
    };

    convertImages();
  }, [previewImages]);

  // useEffect(() => {
  //   if (isPopupOpen) {
  //     reset(room ? room : roomSchema.cast()); // roomSchema.cast() create a room with the default values.
  //   }
  // }, [reset, isSubmitSuccessful, isPopupOpen, room]);

  const onSubmit = async (roomData) => {
    if (roomData.imageFiles) {
      roomData.base64Images = await convertMultipleToBase64(
        roomData.imageFiles
      );
    }
    delete roomData.imageFiles; // Confuses the backend so we remove it

    try {
      console.log('Posting room');
      await postHotelRoomTypes({ ...roomData, hotelId });
      setCarouselPreview([]);
      reset();
      togglePopup();
    } catch (error) {
      console.error(error);
      let errorMessage =
        'An unexpected error occurred. Please try again later.';

      if (error.response.status === 409) {
        errorMessage = `Room with name ${roomData.name} already exists`;
      }

      setError('root', { message: errorMessage });
    }
  };

  return (
    <div className="card shrink-0 w-full max-w-sm bg-base-100 prose lg:prose-md">
      {/* <h1 className="m-0">{room ? 'Update Room' : 'Add Room'}</h1> */}
      <h1 className="m-0">Add Room</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          register={register}
          type="text"
          name="name"
          label="Name"
          aria-label="label-input"
          errors={errors}
        />

        <Select
          options={roomTypes}
          register={register}
          errors={errors}
          name="type"
          placeholder="Choose a room type"
          aria-label="type-input"
        />

        <Input
          register={register}
          type="number"
          label="Price"
          name="price"
          aria-label="price-input"
          errors={errors}
        />

        {carouselPreview && <Carousel images={carouselPreview} />}
        <FileInput
          register={register}
          label="Images"
          name="imageFiles"
          errors={errors}
        />

        <TextArea register={register} name="description" errors={errors} />

        <Input
          register={register}
          type="number"
          name="amountOfRooms"
          label="Quantity"
          aria-label="label-input"
          errors={errors}
        />

        <SubmitButton isLoading={isSubmitting}>Confirm</SubmitButton>
        {errors.root && <ErrorMessage message={errors.root.message} />}
      </form>
    </div>
  );
};

ManageRoomForm.propTypes = {
  room: PropTypes.object,
};

export default ManageRoomForm;
