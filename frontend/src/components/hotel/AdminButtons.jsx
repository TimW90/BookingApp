import { FaPencil, FaRegTrashCan } from 'react-icons/fa6';
import { usePopup } from '../popup/PopupContext';
import ManageHotel from './ManageHotelForm';
import PropTypes from 'prop-types';
import ConfirmDeleteHotel from './ConfirmDeleteHotel';
import ManageRoom from './ManageRoom';

const AdminButtons = ({ item, type }) => {
  const { setPopupContent, togglePopup } = usePopup();

  const handleEditClick = () => {
    switch (type) {
      case 'hotel':
        setPopupContent(<ManageHotel hotel={item} />);
        break;
    }

    togglePopup();
  };

  const handleDeleteClick = () => {
    setPopupContent(<ConfirmDeleteHotel hotelId={item.id} />);
    togglePopup();
  };

  const handleAddRoomClick = () => {
    setPopupContent(<ManageRoom room={item} />);
    togglePopup();
  };

  return (
    <div className="z-10 flex gap-2">
      <button className="z-10" onClick={handleEditClick}>
        <FaPencil />
      </button>
      <button className="z-10" onClick={handleDeleteClick}>
        <FaRegTrashCan />
      </button>
      <button
        className="z-10 btn m-1 btn-secondary"
        onClick={handleAddRoomClick}
      >
        Add room
      </button>
    </div>
  );
};

AdminButtons.propTypes = {
  item: PropTypes.object,
  type: PropTypes.string,
};

export default AdminButtons;
