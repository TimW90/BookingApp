import Navbar from './components/navbar/Navbar';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';
import { PopupProvider } from './components/popup/PopUpContext';
import { HotelProvider } from './components/hotel/HotelContext';

const App = () => {
  return (
    <PopupProvider>
      <HotelProvider>
        <div className="container mx-auto">
          <Navbar />
          <Outlet />
          <Footer />
        </div>
      </HotelProvider>
    </PopupProvider>
  );
};

export default App;
