import ManageHotel from '../components/hotel/ManageHotel';
import HotelList from '@/components/hotel/HotelList';
import { useState, useRef } from 'react';
import Dialog from '@/components/popup/Popup';

const AdminPage = () => {
  const [dialogContent, setDialogContent] = useState(null);
  const dialogRef = useRef(null);

  const toggleDialog = () => {
    if (!dialogRef.current) return;
    dialogRef.current.hasAttribute('open')
      ? dialogRef.current.close()
      : dialogRef.current.showModal();
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-5">Admin Dashboard</h1>
      <button
        className="btn mb-6"
        onClick={() => {
          setDialogContent(<ManageHotel />);
          toggleDialog();
        }}
      >
        Add hotel
      </button>
      <Dialog toggleDialog={toggleDialog} ref={dialogRef}>
        {dialogContent}
      </Dialog>
      <HotelList isAdmin />
    </>
  );
};

export default AdminPage;
