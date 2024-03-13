import defaultImage from '@/images/hotel_placeholder.png';
import PropTypes from 'prop-types';

const DetailImage = ({ image }) => (
  <img
    className="max-w-md rounded-lg shadow-2xl"
    alt="hotel image"
    src={image ? image : defaultImage}
  ></img>
);

DetailImage.propTypes = {
  image: PropTypes.string,
};

export default DetailImage;
