import { usePopup } from '../popup/PopupContext';
import { useHotels } from './HotelContext';
import PropTypes from 'prop-types';

const ConfirmDeleteHotel = ({ hotelId }) => {
  const { handleDeleteHotel } = useHotels();
  const { togglePopup } = usePopup();

  return (
    <div className="flex flex-col justify-center prose">
      <p>Are you sure you want to delete this?</p>
      <button
        onClick={() => {
          handleDeleteHotel(hotelId);
          togglePopup();
        }}
        className="btn btn-outline btn-error"
      >
        Confirm
      </button>
    </div>
  );
};

ConfirmDeleteHotel.propTypes = {
  hotelId: PropTypes.number,
};

export default ConfirmDeleteHotel;
