import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from 'yup';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../api/userApi';
import ErrorMessage from '../alerts/ErrorMessage';
import { useAuth } from './AuthProvider';
import SuccessAlert from '../alerts/SuccessAlert';
import PropTypes from 'prop-types';

const loginSchema = object().shape({
  username: string()
    .email('Invalid email format')
    .required('Email is required'),
  password: string()
    .min(4, 'Password must be at least 4 characters long')
    .required('Password is required'),
});

const Login = ({ onSuccess, redirectOnSuccess }) => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const [successLogin, setSuccessLogin] = useState(false);
  const { handleLogin } = useAuth();

  const navigate = useNavigate();

  const onSubmit = async (userData) => {
    try {
      const response = await loginUser(userData);
      handleLogin(response.data);
      if (onSuccess) onSuccess();
      if (redirectOnSuccess) navigate(redirectOnSuccess);
      setSuccessLogin(true);
    } catch (error) {
      let errorMessage =
        'An unexpected error occurred. Please try again later.';

      if (error.response?.status === 401) {
        errorMessage = 'Invalid email or password.';
      }

      setError('root', { message: errorMessage });
    }

    setTimeout(() => {
      setSuccessLogin(false);
    }, 2000);
  };

  return (
    <div className="card shrink-0 w-full max-w-sm bg-base-100 prose lg:prose-md">
      {successLogin && <SuccessAlert message="Logged in successfully!" />}
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
