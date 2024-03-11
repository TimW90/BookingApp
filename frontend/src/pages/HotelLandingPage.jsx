import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getHotelById } from '@/api/hotelApi';
import LoadingSpinner from '@/components/common/LoadingSpinner';

import HotelAccordion from '@/components/hotel/HotelAccordion';
import SearchBar from '@/components/Searchbar';

const HotelLandingPage = () => {
  const [hotel, setHotel] = useState(null);
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

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <div
        style={{ backgroundImage: `url('${hotel.base64Image}')` }}
        className="min-h-screen flex justify-center items-center bg-no-repeat bg-fixed bg-center bg-cover"
      >
        <div className="bg-black bg-opacity-75 flex justify-center">
          <div className="prose lg:prose-xl m-2">
            <h1 className="text-center">{hotel.name}</h1>
            <p>{hotel.description}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-center mb-5">
        <div className="text-center px-5 py-5 justify-content-center prose">
          <h1>
            Experience the Best hospitality at{' '}
            <span className="hotel-color">{hotel.name}</span>
          </h1>
          <h3>{hotel.description}</h3>
        </div>
      </div>
      <div
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1618773928121-c32242e63f39?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
        }}
        className="min-h-96 bg-center bg-no-repeat bg-cover bg-fixed"
      ></div>
      <SearchBar />
      <HotelAccordion />
    </>
  );
};

export default HotelLandingPage;
