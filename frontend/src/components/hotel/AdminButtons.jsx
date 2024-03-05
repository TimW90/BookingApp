import { FaPencil, FaRegTrashCan } from 'react-icons/fa6';
import { usePopup } from '../popup/PopUpContext';
import ManageHotel from './ManageHotel';
import { useHotel } from './HotelContext';

const AdminButtons = ({ hotel }) => {
  const { setPopupContent, togglePopup } = usePopup();
  const { handleDeleteHotel } = useHotel();

  const handleEditClick = () => {
    setPopupContent(<ManageHotel hotel={hotel} />);
    togglePopup();
  };

  const deleteConfirmationContent = (
    <div className="flex flex-col justify-center">
      <p>Are you sure you want to delete this?</p>
      <button
        onClick={() => {
          handleDeleteHotel(hotel.id);
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

export default AdminButtons;
