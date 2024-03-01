import defaultImage from '@/images/hotel_placeholder.png';
import PropTypes from 'prop-types';

const DetailImage = ({ image }) => (
  <img
    className="max-h-96 w-auto object-cover md:object-scale-down rounded-lg"
    alt="hotel image"
    src={image ? image : defaultImage}
  ></img>
);

DetailImage.propTypes = {
  image: PropTypes.string,
};

export default DetailImage;
