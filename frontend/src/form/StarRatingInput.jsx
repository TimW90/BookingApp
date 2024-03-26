import PropTypes from 'prop-types';
import ErrorMessage from '@/components/alerts/ErrorMessage';

const StarRatingInput = ({ register, name, label, errors }) => {
  return (
    <div className="form-control">
      {label && (
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
      )}

      <div className="rating">
        {[1, 2, 3, 4, 5].map((value) => (
          <input
            key={value}
            type="radio"
            value={value}
            className="mask mask-star-2 bg-orange-400"
            {...register(name)}
          />
        ))}
      </div>
      {errors && errors[name] && (
        <ErrorMessage message={errors[name].message} />
      )}
    </div>
  );
};

StarRatingInput.propTypes = {
  register: PropTypes.func,
  name: PropTypes.string,
  labe: PropTypes.string,
  errors: PropTypes.object,
  ratingLevels: PropTypes.number,
};

export default StarRatingInput;
