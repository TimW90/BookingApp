import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getHotelById } from '@/api/hotelApi';
import DetailImage from '@/components/common/DetailImage';
import PreviewImage from '@/components/common/PreviewImage';
import StarRating from '@/components/hotel/StarRating';

const HotelLandingPage = () => {
  const [hotel, setHotel] = useState();
  const { id } = useParams();

  useEffect(() => {
    const loadHotel = async () => {
      const fetchedHotel = await getHotelById(id);
      console.log(fetchedHotel);
      setHotel(fetchedHotel);
    };

    loadHotel();
  }, [id]);

  return (
    hotel && (
      <div className="flex justify-center">
        <div className="prose m-2">
          <h1 className="text-center">{hotel.name}</h1>
          <DetailImage src={hotel.base64Image} />
        </div>
      </div>
    )
  );
};

export default HotelLandingPage;
