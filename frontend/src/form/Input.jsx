import PropTypes from 'prop-types';
import ErrorMessage from '@/components/alerts/ErrorMessage';
import { camelCaseToTitleCase, capitalize } from '@/components/util/util';

const Input = ({ register, name, label, errors, type }) => {
  return (
    <div className="form-control">
      {label && (
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
      )}

      <input
        className="input input-bordered"
        type={type}
        min={type == 'number' && 1}
        placeholder={`${camelCaseToTitleCase(name)}...`}
        {...register(name)}
        autoComplete={name}
      />
      {errors && errors[name] && (
        <ErrorMessage message={errors[name].message} />
      )}
    </div>
  );
};

Input.propTypes = {
  register: PropTypes.func,
  name: PropTypes.string,
  label: PropTypes.string,
  errors: PropTypes.object,
  type: PropTypes.string,
};

export default Input;
