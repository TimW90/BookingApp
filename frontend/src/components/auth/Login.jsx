import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from 'yup';
import { loginUser } from '@/api/userApi';
import ErrorMessage from '../alerts/ErrorMessage';
import { useAuth } from './AuthProvider';
import SuccessAlert from '../alerts/SuccessAlert';
import PropTypes from 'prop-types';
import { useAlerts } from '../alerts/AlertContext';

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
  const { flashMessage, setFlashMessage } = useAlerts();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (loginData) => {
    try {
      console.log(loginData);
      const response = await loginUser(loginData);
      handleLogin(response.data);
      setFlashMessage('Logged in successfully!');
    } catch (error) {
      let errorMessage =
        'An unexpected error occurred. Please try again later.';

      if (error.response?.status === 401) {
        errorMessage = 'Invalid email or password.';
      }

      setError('root', { message: errorMessage });
    }
  };

  return (
    <div className="card shrink-0 w-full max-w-sm bg-base-100 prose lg:prose-md">
      {flashMessage && <SuccessAlert message="Logged in successfully!" />}
      <form className="card-body" onSubmit={handleSubmit(onSubmit)}>
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
  onSuccess: PropTypes.func,
  redirectOnSuccess: PropTypes.func,
};

export default Login;
