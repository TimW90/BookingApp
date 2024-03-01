import { useState, useEffect } from 'react';
import { getHotels } from '@/api/hotelApi';

const useHotels = () => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const loadHotels = async () => {
      const fetchedHotels = await getHotels();
      setHotels(fetchedHotels);
    };

    loadHotels();
  }, []);

  return hotels;
};

export default useHotels;
