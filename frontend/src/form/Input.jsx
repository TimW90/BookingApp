import PropTypes from 'prop-types';
import ErrorMessage from '@/components/alerts/ErrorMessage';
import { capitalize } from '@/components/util/util';

const Input = ({ register, name, errors }) => {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">{capitalize(name)}</span>
      </label>
      <input
        className="input input-bordered"
        type="text"
        placeholder={`${capitalize(name)}...`}
        {...register(name)}
        autoComplete={name}
      />
      {errors[name] && <ErrorMessage message={errors[name].message} />}
    </div>
  );
};

Input.propTypes = {
  register: PropTypes.func,
  name: PropTypes.string,
  errors: PropTypes.object,
};

export default Input;
