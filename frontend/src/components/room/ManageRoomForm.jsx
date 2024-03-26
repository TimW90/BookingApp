import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { number, object, string, mixed } from 'yup';
import { usePopup } from '../popup/PopupContext';
import { postRoom } from '@/api/roomApi';
import Form from '@/form/Form';
import Input from '@/form/Input';
import Select from '@/form/Select';
import FileInput from '@/form/FileInput';
import TextArea from '@/form/TextArea';
import SubmitButton from '@/form/SubmitButton';
import useRoomTypes from '@/hooks/useRoomTypes';
import ErrorMessage from '../alerts/ErrorMessage';
import PropTypes from 'prop-types';
import { convertToBase64 } from '../images/ImageUtil';

const roomSchema = object().shape({
  name: string().required('Name is a required field'),
  type: string().required('Type is a required field'),
  price: number()
    .required('Price is a required field')
    .positive('Price should be a positive number'),
  images: mixed(),
  description: string()
    .required('Description is a required field')
    .min(15, 'Description should be a minimum of 15 characters'),
  quantity: number()
    .required('Quantity is a required field')
    .min(1, 'Quantity should be atleast 1'),
});

const ManageRoomForm = ({ hotelId }) => {
  console.log(hotelId);
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
  const [imagePreview, setImagePreview] = useState('');
  const previewImage = watch('image');

  useEffect(() => {
    if (previewImage && previewImage.length > 0) {
      const file = previewImage[0];
      setImagePreview(URL.createObjectURL(file));
    }
  }, [previewImage]);

  // useEffect(() => {
  //   if (isPopupOpen) {
  //     reset(room ? room : roomSchema.cast()); // roomSchema.cast() create a room with the default values.
  //   }
  // }, [reset, isSubmitSuccessful, isPopupOpen, room]);

  const onSubmit = async (roomData) => {
    roomData.base64Images = [];
    if (roomData.images) {
      for (let i = 0; i < roomData.images.length; i++) {
        const image = roomData.images[i];
        const base64Image = await convertToBase64(image);
        roomData.base64Images[i] = { base64Image, imageNumber: i };
      }
    }

    try {
      const newRoom = await postRoom({ ...roomData, hotelId });
      // console.log(JSON.stringify(newRoom[0]) + ' has been made');
      setImagePreview('');
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
          name="price"
          aria-label="price-input"
          errors={errors}
        />

        <FileInput register={register} name="images" errors={errors} />
        {imagePreview && <img src={imagePreview} alt="room preview image" />}
        <TextArea register={register} name="description" errors={errors} />

        <Input
          register={register}
          type="number"
          name="quantity"
          aria-label="label-input"
          errors={errors}
        />

        {/* <SubmitButton isLoading={isSubmitting}>Confirm</SubmitButton> */}
        <input type="submit"></input>

        {/* {errors.root && <ErrorMessage message={errors.root.message} />} */}
      </form>
    </div>
  );
};

ManageRoomForm.propTypes = {
  room: PropTypes.object,
};

export default ManageRoomForm;
