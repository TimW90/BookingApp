import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { number, object, string } from 'yup';
import { postHotel } from '@/api/hotelApi';
import ErrorMessage from '@/components/common/ErrorMessage';

const hotelSchema = object().shape({
  name: string().required('Name is required'),
  rating: number()
    .required()
    .min(1, 'Rating should be one ore more')
    .max(5, 'Rating should be five or less'),
  location: string().required('Location is required'),
});

const ManageHotel = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(hotelSchema),
  });

  const onSubmit = async (hotelData) => {
    try {
      console.log(hotelData);
      const response = await postHotel(hotelData);
      console.log(response);
    } catch (error) {
      console.error(error);
      let errorMessage =
        'An unexpected error occurred. Please try again later.';

      setError('root', { message: errorMessage });
    }
  };

  return (
    <div className="card shrink-0 w-full max-w-sm bg-base-100">
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
        {errors.name?.message && <ErrorMessage message={errors.name.message} />}
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
            <option>AMSTERDAM</option>
            <option>ROTTERDAM</option>
            <option>PRAGUE</option>
          </select>
          {errors.location?.message && (
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
          {errors.rating?.message && (
            <ErrorMessage message={errors.rating.message} />
          )}
        </div>
        <div className="form-control mt-6">
          <button type="submit" className="btn btn-primary m-1">
            Confirm
          </button>
          {errors.root?.message && (
            <ErrorMessage message={errors.root.message} />
          )}
        </div>
      </form>
    </div>
  );
};

export default ManageHotel;
