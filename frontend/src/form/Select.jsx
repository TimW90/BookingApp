import { capitalize, enumSimpleName } from '@/components/util/util';
import PropTypes from 'prop-types';
import ErrorMessage from '@/components/alerts/ErrorMessage';

const Select = ({ register, options, name, errors, placeholder }) => {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">{capitalize(name)}</span>
      </label>

      <select
        className="select select-bordered"
        {...register(name)}
        defaultValue=""
      >
        <option disabled value="">
          {placeholder}
        </option>

        {/* This will be the list of options in the dropdown with their corresponding values */}
        {options.map((value) => (
          <option key={value} value={value}>
            {enumSimpleName(value)}
          </option>
        ))}
      </select>
      {errors[name] && <ErrorMessage message={errors[name].message} />}
    </div>
  );
};

Select.propTypes = {
  register: PropTypes.func,
  options: PropTypes.node,
  name: PropTypes.string,
  errors: PropTypes.object,
};

export default Select;
