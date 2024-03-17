import PropTypes from 'prop-types';
import ErrorMessage from '@/components/alerts/ErrorMessage';

const StarRatingInput = ({ register, name, errors }) => {
  return (
    <div className="form-control">
      <label className="label">
        <span className="label-text">Rating</span>
      </label>
      <div className="rating">
        {[1, 2, 3, 4, 5].map((value) => (
          <input
            key={value}
            type="radio"
            value={value}
            className="mask mask-star-2 bg-orange-400"
            name="star-rating"
            {...register(name)}
          />
        ))}
      </div>
      {errors[name] && <ErrorMessage message={errors[name].message} />}
    </div>
  );
};

StarRatingInput.propTypes = {
  register: PropTypes.func,
  name: PropTypes.string,
  errors: PropTypes.object,
  ratingLevels: PropTypes.number,
};

export default StarRatingInput;
