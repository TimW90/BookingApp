import { useState, useEffect } from 'react';
import { getLocations } from '@/api/hotelApi';

const useLocations = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const loadLocations = async () => {
      const fetchedLocations = await getLocations();
      setLocations(fetchedLocations);
    };

    loadLocations();
  }, []);

  return locations;
};

export default useLocations;
