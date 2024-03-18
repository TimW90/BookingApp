import PropTypes from 'prop-types';
import ErrorMessage from '@/components/alerts/ErrorMessage';
import { capitalize } from '@/components/util/util';

const TextArea = ({ register, name, errors }) => (
  <div className="form-control py-2">
    <label className="label">
      <span className="label-text">{capitalize(name)}</span>
    </label>
    <textarea
      className="textarea textarea-bordered"
      placeholder={capitalize(name) + '...'}
      {...register(name)}
    ></textarea>
    {errors[name] && <ErrorMessage message={errors[name].message} />}
  </div>
);

export default TextArea;

TextArea.propTypes = {
  register: PropTypes.func,
  name: PropTypes.string,
  errors: PropTypes.object,
};
