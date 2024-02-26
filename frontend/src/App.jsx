import Navbar from './components/navbar/Navbar';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';
import { PopupProvider } from './components/popup/PopUpContext';

const App = () => {
  return (
    <PopupProvider>
      <div className="container mx-auto">
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    </PopupProvider>
  );
};

export default App;
