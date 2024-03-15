import Navbar from './components/navbar/Navbar';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';
import { PopupProvider } from './components/popup/PopUpContext';
import RoomCard from './components/room/RoomCard';
import { HotelProvider } from './components/hotel/HotelContext';
import usePagination from './hooks/usePagination';
import { useState } from 'react';

const App = () => {
  return (
    <PopupProvider>
      <HotelProvider>
        <div className="container mx-auto">
          <Navbar />
          <Outlet />
          <RoomCard />
          <Footer />
        </div>
      </HotelProvider>
    </PopupProvider>
  );
};

export default App;
