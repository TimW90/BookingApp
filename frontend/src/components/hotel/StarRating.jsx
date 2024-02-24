const StarRating = ({ amountOfStars }) => {
  return (
    <div className="flex rating">
      {Array.from({ length: amountOfStars }, (_, index) => (
        <div key={index} className="mask mask-star-2 bg-orange-400">
          <input
            type="radio"
            name="rating-2"
            aria-label="hotel star rating"
          ></input>
        </div>
      ))}
    </div>
  );
};

export default StarRating;
