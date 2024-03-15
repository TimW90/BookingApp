import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string, ref } from 'yup';
import { postUser } from '@/api/userApi';
import ErrorMessage from '../alerts/ErrorMessage';
import PropTypes from 'prop-types';
import { useAuth } from './AuthProvider';

const userSchema = object().shape({
  fullName: string().required('Full name is required'),
  email: string().email().required('Email is required'),
  password: string().min(4, 'Must be at least 4 characters long').required(),
  confirmPassword: string()
    .oneOf([ref('password'), null], "Password doesn't match")
    .required('Confirm password is required'),
});

const Register = ({ togglePopup }) => {
  const { handleLogin } = useAuth();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
  });

  const onSubmit = async (userData) => {
    console.log(userData);
    try {
      const result = postUser(userData);
      console.log(result);
      togglePopup();
    } catch (error) {
      let errorMessage =
        'An unexpected error occurred. Please try again later.';

      console.error(error);
      // if (error.response.status === 409) {
      //   errorMessage =
      //     'This email address is already in use. Please use a different email or log in.';
      // }

      setError('root', { message: errorMessage });
    }
  };

  return (
    <div className="card shrink-0 w-full max-w-sm bg-base-100">
      <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
        {/* Full name field */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Full Name</span>
          </label>
          <input
            className="input input-bordered"
            type="text"
            placeholder="Full name..."
            {...register('fullName')}
            autoComplete="name"
          />
        </div>
        {errors.fullName?.message && (
          <ErrorMessage message={errors.fullName.message} />
        )}

        {/* Email field */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            className="input input-bordered"
            placeholder="Email..."
            {...register('email')}
            autoComplete="email"
          />
        </div>
        {errors.username?.message && (
          <ErrorMessage message={errors.username.message} />
        )}

        {/* Password field */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input
            className="input input-bordered"
            type="password"
            placeholder="Password..."
            {...register('password')}
            autoComplete="current-password"
          />
        </div>
        {errors.password?.message && (
          <ErrorMessage message={errors.password.message} />
        )}

        {/* Confirm password field */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Confirm Password</span>
          </label>
          <input
            className="input input-bordered"
            type="password"
            placeholder="Confirm Password..."
            {...register('confirmPassword')}
            autoComplete="current-password"
          />
        </div>
        {errors.confirmPassword?.message && (
          <ErrorMessage message={errors.confirmPassword.message} />
        )}

        {/* Submit button */}
        <div className="form-control mt-6">
          <button type="submit" className="btn m-1">
            Register
          </button>
          {errors.root?.message && (
            <ErrorMessage message={errors.root.message} />
          )}
        </div>
      </form>
    </div>
  );
};

Register.propTypes = {
  onSuccess: PropTypes.func,
};

export default Register;
