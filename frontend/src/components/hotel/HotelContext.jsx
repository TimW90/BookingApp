import { createContext, useContext, useState, useEffect } from 'react';
import { getHotels, postHotel, updateHotel, deleteHotel } from '@/api/hotelApi';
import PropTypes from 'prop-types';

const HotelContext = createContext();

export const HotelProvider = ({ children }) => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const loadHotelPages = async () => {
      const fetchedHotelsPages = await getHotels();
      setHotels(fetchedHotelsPages.content); // content because getHotels returns a page and content is where the actual hotels are
    };

    loadHotelPages();
  }, []);

  const handleAddHotel = async (hotelData) => {
    const newHotel = await postHotel(hotelData);
    setHotels((prev) => [newHotel, ...prev]);
  };

  const handleUpdateHotel = async (id, hotelData) => {
    const updatedHotel = await updateHotel(id, hotelData);
    setHotels((prev) =>
      prev.map((hotel) => (hotel.id === id ? updatedHotel : hotel))
    );
  };

  const handleDeleteHotel = async (id) => {
    await deleteHotel(id);
    setHotels((prev) => prev.filter((hotel) => hotel.id !== id));
  };

  const contextValue = {
    hotels,
    setHotels,
    handleAddHotel,
    handleUpdateHotel,
    handleDeleteHotel,
  };

  return (
    <HotelContext.Provider value={contextValue}>
      {children}
    </HotelContext.Provider>
  );
};

export const useHotels = () => useContext(HotelContext);

HotelProvider.propTypes = {
  children: PropTypes.any,
};
