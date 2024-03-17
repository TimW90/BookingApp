import ErrorMessage from '@/components/alerts/ErrorMessage';
import PropTypes from 'prop-types';

const FileInput = ({ register, name, errors }) => (
  <div className="form-control py-2">
    <label className="label">
      <span className="label-text">Image</span>
    </label>
    <input
      type="file"
      className="file-input file-input-bordered w-full max-w-xs"
      {...register(name)}
    />
    {errors[name] && <ErrorMessage message={errors[name].message} />}
  </div>
);

FileInput.propTypes = {
  register: PropTypes.func,
  name: PropTypes.string,
  errors: PropTypes.object,
};

export default FileInput;
