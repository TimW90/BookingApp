import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from 'yup';
import ErrorMessage from '../alerts/ErrorMessage';
import { useAuth } from './AuthProvider';
import PropTypes from 'prop-types';
import { usePopup } from '../popup/PopupContext';

const loginSchema = object().shape({
  username: string()
    .email('Invalid email format')
    .required('Email is required'),
  password: string()
    .min(4, 'Password must be at least 4 characters long')
    .required('Password is required'),
});

const Login = () => {
  const { handleLogin } = useAuth();
  const { togglePopup } = usePopup();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (loginRequest) => {
    try {
      await handleLogin(loginRequest);
      togglePopup();
    } catch (error) {
      let errorMessage =
        'An unexpected error occurred. Please try again later.';

      if (error.response?.status === 401) {
        errorMessage = 'Invalid email or password.';
      }

      console.error(error);
      setError('root', { message: errorMessage });
    }
  };

  return (
    <div className="card shrink-0 w-full max-w-sm prose lg:prose-md">
      <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
        {/* Email field */}
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            className="input input-bordered"
            placeholder="Email..."
            {...register('username')}
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

        {/* Confirm login button */}
        <div className="form-control mt-6">
          <button type="submit" className="btn m-1">
            Login
          </button>
        </div>
        {errors.root?.message && <ErrorMessage message={errors.root.message} />}
      </form>
    </div>
  );
};

Login.propTypes = {
  togglePopup: PropTypes.func,
};

export default Login;
