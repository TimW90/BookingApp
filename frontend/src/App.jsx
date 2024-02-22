import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { Outlet } from 'react-router-dom';

const App = () => {
  return (
    <>
      <Navbar />
        <Outlet />
      <Footer />
    </>
  );
};

export default App;
