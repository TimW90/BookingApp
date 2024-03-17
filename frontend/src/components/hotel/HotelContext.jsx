import { createContext, useContext, useState, useEffect } from 'react';
import { getHotels, postHotel, updateHotel, deleteHotel } from '@/api/hotelApi';
import PropTypes from 'prop-types';

const HotelContext = createContext();

export const HotelProvider = ({ children }) => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(0);
  const [params, setParams] = useState({});
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const loadHotelPages = async () => {
      const fetchedHotelsPages = await getHotels();
      setHotels(fetchedHotelsPages.content); // content because getHotels returns a page and content is where the actual hotels are
    };

    loadHotelPages();
  }, []);

  const handleAddHotel = async (hotelData) => {
    try {
      const newHotel = await postHotel(hotelData);
      setHotels((prev) => [newHotel, ...prev]);
    } catch (error) {
      console.error('Error adding new hotel:', error);
    }
  };

  const handleUpdateHotel = async (id, hotelData) => {
    const updatedHotel = await updateHotel(id, hotelData);
    setHotels((prev) =>
      prev.map((hotel) => (hotel.id === id ? updatedHotel : hotel))
    );
    setUpdatePage(Date.now());
  };

  const handleDeleteHotel = async (id) => {
    await deleteHotel(id);
    setHotels((prev) => prev.filter((hotel) => hotel.id !== id));
    setUpdatePage(Date.now());
  };

  const updateSearchParams = (newParams) => {
    setParams(newParams);
    setPage(0);
  };

  const contextValue = {
    hotels,
    loading,
    error,
    hasMore,
    setHotels,
    updateSearchParams,
    handleAddHotel,
    handleUpdateHotel,
    handleDeleteHotel,
    // updatePage,
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
