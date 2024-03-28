import { useState, useEffect } from 'react';
import { getRoomTypes } from '@/api/hotelRoomTypesApi';

const useRoomTypes = () => {
  const [roomTypes, setRoomTypes] = useState([]);

  useEffect(() => {
    const loadRoomTypes = async () => {
      const fetchedRoomTypes = await getRoomTypes();
      fetchedRoomTypes;
      setRoomTypes(fetchedRoomTypes);
    };

    loadRoomTypes();
  }, []);

  return roomTypes;
};

export default useRoomTypes;
