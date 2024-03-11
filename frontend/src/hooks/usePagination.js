import { useState, useEffect } from 'react';
import axios from 'axios';
import { useHotels } from '@/components/hotel/HotelContext';
import { getHotels } from '@/api/hotelApi';

const usePagination = (params, pageNumber) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [hasMore, setHasmore] = useState(false);
  const { setHotels } = useHotels();

  useEffect(() => {
    setLoading(true);
    setError(false);

    const queryHotels = async () => {
      const queriedHotels = await getHotels(params);
      setHotels(queriedHotels);
    };

    queryHotels();
  }, [setHotels, params, pageNumber]);
};

export default usePagination;
