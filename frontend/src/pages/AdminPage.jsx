import { useState } from 'react';
import PopUpNew from '../components/common/PopUp';
import ManageHotel from '../components/hotel/ManageHotel';
import HotelList from '@/components/hotel/HotelList';

const AdminPage = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const togglePopup = () => setIsPopupOpen(!isPopupOpen);

  return (
    <>
      <h1 className="text-3xl font-bold mb-5">Admin Dashboard</h1>

      <div className="mb-4">
        <PopUpNew
          isOpen={isPopupOpen}
          onClose={togglePopup}
          buttonText="Add Hotel"
        >
          <ManageHotel />
        </PopUpNew>
      </div>

      <HotelList isAdmin />
    </>
  );
};

export default AdminPage;
