import { createContext, useContext, useState, useEffect } from 'react';
import { getHotels, postHotel, updateHotel, deleteHotel } from '@/api/hotelApi';
import PropTypes from 'prop-types';
import { useSearchParams } from '../searchbar/SearchParamsContext';

const HotelContext = createContext();

export const HotelProvider = ({ children }) => {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const { searchParams } = useSearchParams();

  useEffect(() => {
    setLoading(true);

    const queryHotels = async () => {
      const queryParams = { ...searchParams, page };
      console.log('SearchParams or page changed', queryParams, page);
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
  }, [setHotels, searchParams, page]);

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

  // This is a naive approach to endless scrolling that works for now
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  const handleScroll = () => {
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
