import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { number, object, string, mixed } from 'yup';
import ErrorMessage from '../common/ErrorMessage';
import { postHotel } from '@/api/hotelApi';

const hotelSchema = object().shape({
  name: string().required('Name is required'),
  rating: number()
    .required()
    .positive('Rating should be one or more')
    .max(5, 'Rating should be five or less'),
  location: string().required('Location is required'),
  image: mixed(),
  description: string()
    .required()
    .min(15, 'Description should be a minimum of 15 characters'),
});

const AddHotel = () => {
  const {
    register,
    handleSubmit,
    setError,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(hotelSchema),
  });

  const [imagePreview, setImagePreview] = useState('');
  const watchedFile = watch('image');

  useEffect(() => {
    if (watchedFile && watchedFile.length > 0) {
      const file = watchedFile[0];
      setImagePreview(URL.createObjectURL(file));
    }
  }, [watchedFile]);

  const onSubmit = async (hotelData) => {
    const formData = new FormData();
    formData.append('name', hotelData.name);
    formData.append('rating', hotelData.rating);
    formData.append('location', hotelData.location);
    formData.append('description', hotelData.description);

    if (hotelData.image && hotelData.image[0]) {
      formData.append('image', hotelData.image[0]);
    }

    console.log(formData);

    try {
      await postHotel(formData);
      reset();
    } catch (error) {
      console.error(error);
      let errorMessage =
        'An unexpected error occurred. Please try again later.';

      setError('root', { message: errorMessage });
    }
  };

  return (
    <div className="card shrink-0 w-full max-w-sm bg-base-100 prose lg:prose-md">
      <h1 className="m-0">Add Hotel</h1>
      {imagePreview ? (
        <img src={imagePreview} alt="hotel preview image" />
      ) : null}
      <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
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
            <option>Amsterdam</option>
            <option>Rotterdam</option>
            <option>Prague</option>
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
                {...register('rating')}
                type="radio"
                value={value}
                className="mask mask-star-2 bg-orange-400"
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
            Confirm
          </button>
          {errors.root && <ErrorMessage message={errors.root.message} />}
        </div>
      </form>
    </div>
  );
};

export default AddHotel;
