import PropTypes from 'prop-types';

const Select = ({ register, options, name }) => {
  return (
    <select {...register(name)} {...rest}>
      {options.map((value) => (
        <option key={value} value={value}>
          {value}
        </option>
      ))}
    </select>
  );
};

Select.propTypes = {
  register: PropTypes.func,
  options: PropTypes.node,
  name: PropTypes.string,
};

export default Select;
