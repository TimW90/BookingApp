import Navbar from './components/navbar/Navbar';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';
import { PopupProvider } from './components/popup/PopUpContext';
import { HotelProvider } from './components/hotel/HotelContext';
import { AuthProvider } from './components/auth/AuthProvider';

const App = () => {
  return (
    <AuthProvider>
      <HotelProvider>
        <PopupProvider>
          <div className="container mx-auto">
            <Navbar />
            <Outlet />
            <Footer />
          </div>
        </PopupProvider>
      </HotelProvider>
    </AuthProvider>
  );
};

export default App;
