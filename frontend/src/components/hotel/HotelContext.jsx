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
    setLoading(true);

    const queryHotels = async () => {
      const queryParams = {
        ...params,
        page, // This adds the page parameter to the query
      };

      const queriedHotelPages = await getHotels(queryParams);

      if (page === 0) {
        setHotels(queriedHotelPages.content);
      } else {
        setHotels((prevHotels) => [
          ...prevHotels,
          ...queriedHotelPages.content,
        ]);
      }

      setHasMore(!queriedHotelPages.last);
      setLoading(false);
    };

    queryHotels();
  }, [setHotels, params, page]);

  const handleAddHotel = async (hotelData) => {
    try {
      const newHotel = await postHotel(hotelData);
      setHotels((prev) => [newHotel, ...prev]);
    } catch (error) {
      console.error('Error adding new hotel:', error);
    }
  };

  const handleUpdateHotel = async (id, hotelData) => {
    try {
      const updatedHotel = await updateHotel(id, hotelData);
      setHotels((prev) =>
        prev.map((hotel) => (hotel.id === id ? updatedHotel : hotel))
      );
    } catch (error) {
      console.error('Error updating hotel:', error);
    }
  };

  const handleDeleteHotel = async (id) => {
    await deleteHotel(id);
    setHotels((prev) => prev.filter((hotel) => hotel.id !== id));
  };

  const updateSearchParams = (newParams) => {
    setParams(newParams);
    setPage(0);
  };

  // This is a naive approach to endless scrolling that works for now
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [hotels]);

  const handleScroll = async () => {
    if (
      hasMore &&
      window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
    ) {
      setLoading(true);
      setPage((prev) => prev + 1);
    }
  };

  const contextValue = {
    hotels,
    loading,
    error,
    hasMore,
    setHotels,
    setPage,
    updateSearchParams,
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
