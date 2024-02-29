import Navbar from './components/navbar/Navbar';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';
import RoomCard from './components/room/RoomCard';

const App = () => {
  return (
    <div className="container mx-auto">
      <Navbar />
      <Outlet />
      <RoomCard />
      <Footer />
    </div>
  );
};

export default App;
