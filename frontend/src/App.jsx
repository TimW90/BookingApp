import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Hero from './components/Hero'
import Accordeon from './components/Accordeon'
import { Outlet } from 'react-router-dom'


function App() {

  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />

    </>
    
  )
}

export default App
