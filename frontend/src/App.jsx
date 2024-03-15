import Navbar from './components/navbar/Navbar';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';
import { PopupProvider } from './components/popup/PopupContext';
import { HotelProvider } from './components/hotel/HotelContext';
import { AuthProvider } from './components/auth/AuthProvider';
import { AlertProvider } from './components/alerts/AlertContext';

const App = () => {
  return (
    <AlertProvider>
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
    </AlertProvider>
  );
};

export default App;
