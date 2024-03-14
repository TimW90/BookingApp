import Navbar from './components/navbar/Navbar';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';
import { PopupProvider } from './components/popup/PopupContext';
import { HotelProvider } from './components/hotel/HotelContext';
import { AuthProvider } from './components/auth/AuthProvider';

const App = () => {
  return (
    <AuthProvider>
      <PopupProvider>
        <HotelProvider>
          <div className="container mx-auto">
            <Navbar />
            <Outlet />
            <Footer />
          </div>
        </HotelProvider>
      </PopupProvider>
    </AuthProvider>
  );
};

export default App;
