import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { object, string } from "yup";
import { postUser } from "../../api/user-api";
import WarningMessage from "../alerts/WarningMessage";

const hotelSchema = object().shape({
  name: string().required("Name is required"),
  rating: string()
  .required
  .min(1, 'Rating should be one ore more')
  .max(5, 'Rating should be five or less'),
  location: string()
  .required
  .


});

const ManageHotel = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm <
  hotelSchema >
  {
    resolver: yupResolver(hotelSchema),
  };

  const onSubmit = async (hotelData) => {
    try {
      const response = await postUser(hotelData);
      console.log(response);
    } catch (error) {
      let errorMessage =
        "An unexpected error occurred. Please try again later.";

      setError("root", { message: errorMessage });
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
            {...register("name")}
            autoComplete="name"
          />
        </div>
        {errors.name?.message && (
          <WarningMessage message={errors.name.message} />
        )}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Rating</span>
          </label>
          <input
            className="input input-bordered"
            placeholder="Rating..."
            {...register("rating")}
            autoComplete="email"
          />
        </div>
        {errors.username?.message && (
          <WarningMessage message={errors.rating.message} />
        )}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Location</span>
          </label>
          <input
            className="input input-bordered"
            placeholder="Location..."
            {...register("location")}
            autoComplete="location"
          />
        </div>
        {errors.username?.message && (
          <WarningMessage message={errors.location.message} />
        )}
        <div className="form-control mt-6">
          <button type="submit" className="btn btn-primary m-1">
            Confirm
          </button>
          {errors.root?.message && (
            <WarningMessage message={errors.root.message} />
          )}
        </div>
      </form>
    </div>
  );
};

export default ManageHotel;
