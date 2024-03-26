import ErrorMessage from '@/components/alerts/ErrorMessage';
import PropTypes from 'prop-types';

const FileImageInput = ({ register, name, label, errors }) => (
  <div className="form-control py-2">
    <label className="label">
      <span className="label-text">{label}</span>
    </label>
    <input
      type="file"
      className="file-input file-input-bordered w-full max-w-xs"
      accept="image/*"
      multiple
      {...register(name)}
    />
    {errors[name] && <ErrorMessage message={errors[name]?.message} />}
  </div>
);

FileImageInput.propTypes = {
  register: PropTypes.func,
  labE: PropTypes.string,
  name: PropTypes.string,
  errors: PropTypes.object,
};

export default FileImageInput;
