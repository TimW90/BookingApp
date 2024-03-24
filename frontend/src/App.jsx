import Navbar from './components/navbar/Navbar';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';
import { PopupProvider } from './components/popup/PopupContext';
import { HotelProvider } from './components/hotel/HotelContext';
import { AuthProvider } from './components/auth/AuthProvider';
import { AlertProvider } from './components/alerts/AlertContext';
import { SearchParamsProvider } from './components/searchbar/SearchParamsContext';

const App = () => {
  return (
    <AlertProvider>
      <AuthProvider>
        <SearchParamsProvider>
          <HotelProvider>
            <PopupProvider>
              <div className="container mx-auto">
                <Navbar />
                <Outlet />
                <Footer />
              </div>
            </PopupProvider>
          </HotelProvider>
        </SearchParamsProvider>
      </AuthProvider>
    </AlertProvider>
  );
};

export default App;
