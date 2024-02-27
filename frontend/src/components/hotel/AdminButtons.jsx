import ManageHotel from './ManageHotel';
import { FaPencil, FaRegTrashCan } from 'react-icons/fa6';
import Popup from '../popup/Popup';
import { usePopup } from '../popup/PopUpContext';
import { deleteHotel } from '@/api/hotelApi';
import PropTypes from 'prop-types';

// The buttons corresponding with the provided hotel
const AdminButtons = ({ hotel }) => {
  const { togglePopup, popupRef, popupContent, setPopupContent } = usePopup();

  return (
    <div className="z-10 flex gap-2">
      {/* This is the edit button the edit form is the same as the add form but with an existing hotel provided */}
      <button
        className="z-10"
        onClick={() => {
          setPopupContent(<ManageHotel hotel={hotel} />);
          togglePopup();
        }}
      >
        <FaPencil />
      </button>

      {/* Delete button probably separate these into components when reused somewhere else */}
      <button
        className="z-10"
        onClick={() => {
          setPopupContent(
            <div className="flex flex-col justify-center">
              <p>Are you sure you want to delete this?</p>
              <button
                onClick={() => {
                  deleteHotel(hotel.id);
                  togglePopup();
                }}
                className="btn btn-outline btn-error"
              >
                Confirm
              </button>
            </div>
          );
          togglePopup();
        }}
      >
        <FaRegTrashCan />
      </button>

      <Popup togglePopup={togglePopup} ref={popupRef}>
        {popupContent}
      </Popup>
    </div>
  );
};

AdminButtons.propTypes = {
  hotel: PropTypes.object,
};

export default AdminButtons;
