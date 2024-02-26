import ManageHotel from '../components/hotel/ManageHotel';
import HotelList from '@/components/hotel/HotelList';
import { usePopup } from '@/components/popup/PopUpContext';

const AdminPage = () => {
  const { openPopup } = usePopup();

  return (
    <>
      <h1 className="text-3xl font-bold mb-5">Admin Dashboard</h1>

      <button className="btn" onClick={() => openPopup(<ManageHotel />)}>
        Add hotel
      </button>
      <HotelList isAdmin />
    </>
  );
};

export default AdminPage;
