import ManageHotel from '../components/hotel/ManageHotel';
import HotelList from '@/components/hotel/HotelAccordion';
import { usePopup } from '@/components/popup/PopUpContext';

const AdminPage = () => {
  const { togglePopup, setPopupContent } = usePopup();
  return (
    <>
      <h1 className="text-3xl font-bold mb-5">Admin Dashboard</h1>
      <button
        className="btn mb-6"
        onClick={() => {
          setPopupContent(<ManageHotel />);
          togglePopup();
        }}
      >
        Add hotel
      </button>
      <HotelList isAdmin />
    </>
  );
};

export default AdminPage;
