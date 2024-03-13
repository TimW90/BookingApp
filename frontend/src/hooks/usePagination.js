import { useState, useEffect } from 'react';
import axios from 'axios';
import { useHotels } from '@/components/hotel/HotelContext';
import { getHotels } from '@/api/hotelApi';

const usePagination = (params, pageNumber) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const { hotels, setHotels } = useHotels();

  useEffect(() => {
    setLoading(true);
    setError(false);

    const queryHotels = async () => {
      const queriedHotelPages = await getHotels(params);
      setHotels(queriedHotelPages.content);
      setHasMore(queriedHotelPages.last);
      setLoading(false);
    };

    queryHotels();
  }, [setHotels, params, pageNumber]);

  return { hotels, hasMore, loading, error };
};

export default usePagination;
