import ManageHotel from '../components/hotel/ManageHotelForm';
import HotelAccordion from '@/components/hotel/HotelAccordion';
import { usePopup } from '@/components/popup/PopupContext';

const AdminPage = () => {
  const { togglePopup, setPopupContent } = usePopup();
  return (
    <>
      <h1 className="text-3xl font-bold my-5">Admin Dashboard</h1>
      <button
        className="btn mb-6"
        onClick={() => {
          setPopupContent(<ManageHotel />);
          togglePopup();
        }}
      >
        Add hotel
      </button>
      <HotelAccordion isAdmin />
    </>
  );
};

export default AdminPage;
