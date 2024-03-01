import PropTypes from 'prop-types';
import StarRating from './StarRating';
import PreviewImage from '../common/PreviewImage';
import DetailImage from '../common/DetailImage';
import AdminButtons from './AdminButtons';
import { Link } from 'react-router-dom';

const HotelCard = ({ hotel, isAdmin }) => {
  return (
    <>
      <div className="flex items-center justify-between collapse-title prose min-w-full p-0">
        <div className="flex items-center gap-4">
          <PreviewImage image={hotel.base64Image} />
          <h2 className="m-0">{hotel.name}</h2>
          {isAdmin && <AdminButtons hotel={hotel} />}
        </div>
        <StarRating amountOfStars={hotel.rating} />
      </div>
      <div className="collapse-content flex justify-between">
        <div className="w-2/5 prose card-bordered">
          <h3 className="m-0">Description</h3>
          <hr className="mb-2"></hr>
          <p>{hotel.description}</p>
        </div>
        <div>
          <DetailImage image={hotel.base64Image} />
          <div className="m-3 flex justify-center">
            <Link className="btn btn-secondary" to={`/hotel/${hotel.id}`}>
              Go to hotel
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

HotelCard.propTypes = {
  hotel: PropTypes.object.isRequired,
  isAdmin: PropTypes.bool,
};

export default HotelCard;
