import defaultImage from '@/images/hotel_placeholder.png';
import PropTypes from 'prop-types';

const PreviewImage = ({ image }) => {
  return (
    <img
      className="h-10 w-10 object-cover rounded-full"
      alt="hotel preview"
      src={image ? `data:image/png;base64, ${image}` : defaultImage}
    />
  );
};

PreviewImage.propTypes = {
  image: PropTypes.string,
};

export default PreviewImage;
