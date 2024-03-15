import { FaPencil, FaRegTrashCan } from 'react-icons/fa6';
import { usePopup } from '../popup/PopUpContext';
import ManageHotel from './ManageHotel';
import ManageRoom from './ManageRoom';
import { useHotels } from './HotelContext';

const AdminButtons = ({ item }) => {
  const { setPopupContent, togglePopup } = usePopup();
  const { handleDeleteHotel } = useHotels();

  const handleEditClick = () => {
    setPopupContent(<ManageHotel hotel={item} />);
    togglePopup();
  };

  const deleteConfirmationContent = (
    <div className="flex flex-col justify-center">
      <p>Are you sure you want to delete this?</p>
      <button
        onClick={() => {
          handleDeleteHotel(item.id);
          togglePopup();
        }}
        className="btn btn-outline btn-error"
      >
        Confirm
      </button>
    </div>
  );

  const handleDeleteClick = () => {
    setPopupContent(deleteConfirmationContent);
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

export default AdminButtons;
