import PropTypes from 'prop-types';

const Input = ({ register, name }) => {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">{name}</span>
      </label>
      <input
        className="input input-bordered"
        type="text"
        placeholder={`${name}...`}
        {...register(name.toLowerCase())}
        autoComplete={name}
      />
    </div>
  );
};

Input.propTypes = {
  register: PropTypes.func,
  name: PropTypes.string,
};

export default Input;
