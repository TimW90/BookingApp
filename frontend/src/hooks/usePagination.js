import { useState, useEffect } from 'react';
import { useHotels } from '@/components/hotel/HotelContext';
import { getHotels } from '@/api/hotelApi';

const usePagination = (initialParams) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { hotels, setHotels } = useHotels();
  const [page, setPage] = useState(0);

  useEffect(() => {
    setLoading(true);
    setError(false);

    const queryHotels = async () => {
      const params = { ...initialParams, page };
      const queriedHotelPages = await getHotels(params);
      setHotels((prevHotels) => [...prevHotels, ...queriedHotelPages.content]);
      setHasMore(!queriedHotelPages.last);
      setLoading(false);
    };

    queryHotels();
  }, [setHotels, initialParams, page]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  return { hotels, hasMore, loading, error };
};

export default usePagination;
