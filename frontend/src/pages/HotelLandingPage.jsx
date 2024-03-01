import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getHotelById } from '@/api/hotelApi';
import DetailImage from '@/components/common/DetailImage';
import LoadingSpinner from '@/components/common/LoadingSpinner';

const HotelLandingPage = () => {
  const [hotel, setHotel] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    setIsLoading(true);

    const loadHotel = async () => {
      const fetchedHotel = await getHotelById(id);

      setHotel(fetchedHotel);
      setIsLoading(false);
    };

    loadHotel();
  }, [id]);

  return (
    <>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="flex justify-center">
          <div className="prose m-2">
            <h1 className="text-center">{hotel.name}</h1>
            <DetailImage image={hotel.base64Image} />
          </div>
        </div>
      )}
    </>
  );
};

export default HotelLandingPage;
