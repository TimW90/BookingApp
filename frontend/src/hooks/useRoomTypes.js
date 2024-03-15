import { useState, useEffect } from 'react';
import { getRoomTypes } from '@/api/roomApi';

const useRoomTypes = () => {
  const [roomTypes, setRoomTypes] = useState([]);

  useEffect(() => {
    const loadRoomTypes = async () => {
      const fetchedRoomTypes = await getRoomTypes();
      setRoomTypes(fetchedRoomTypes);
    };

    loadRoomTypes();
  }, []);

  return roomTypes;
};

export default useRoomTypes;