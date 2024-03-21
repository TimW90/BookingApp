import { useState, useEffect } from 'react';
import { getRoomTypes } from '@/api/roomApi';

const useRoomTypes = () => {
  const [roomTypes, setRoomTypes] = useState([]);

  useEffect(() => {
    const loadRoomTypes = async () => {
      const fetchedRoomTypes = await getRoomTypes();
      console.log(fetchedRoomTypes);
      setRoomTypes(fetchedRoomTypes);
    };

    loadRoomTypes();
  }, []);

  return roomTypes;
};

export default useRoomTypes;
