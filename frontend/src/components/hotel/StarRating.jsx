import PropTypes from 'prop-types';

const StarRating = ({ amountOfStars }) => {
  return (
    <div className="flex rating">
      {[...new Array(amountOfStars)].map((_, index) => (
        <div key={index} className="mask mask-star-2 bg-orange-400">
          <input
            type="radio"
            name="rating-2"
            aria-label="hotel star rating"
            disabled
          ></input>
        </div>
      ))}
    </div>
  );
};

StarRating.propTypes = {
  amountOfStars: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default StarRating;
