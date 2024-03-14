import { FaPencil, FaRegTrashCan } from 'react-icons/fa6';
import { usePopup } from '../popup/PopupContext';
import ManageHotel from './ManageHotel';
import PropTypes from 'prop-types';
import ConfirmDeleteHotel from './ConfirmDeleteHotel';

const AdminButtons = ({ item, type }) => {
  const { setPopupContent, togglePopup } = usePopup();

  const handleEditClick = () => {
    switch (type) {
      case 'hotel':
        setPopupContent(<ManageHotel hotel={item} />);
        break;

      case 'rooms':
        setPopupContent(
          'Room placeholder this is where room form for managing rooms will go'
        );
        break;
    }

    togglePopup();
  };

  const handleDeleteClick = () => {
    setPopupContent(<ConfirmDeleteHotel hotelId={item.id} />);
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
    </div>
  );
};

AdminButtons.propTypes = {
  item: PropTypes.object,
  type: PropTypes.string,
};

export default AdminButtons;
