import { useEffect, useState } from 'react';
import { getHotels } from '@/api/hotelApi';
import HotelItem from '@/components/hotel/HotelItem';

const Accordeon = () => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const loadHotels = async () => {
      const fetchedHotels = await getHotels();
      setHotels(fetchedHotels);
    };

    loadHotels();
  }, []);

  return (
    <>
      <div className="collapse bg-base-200">
        <input
          type="radio"
          name="my-accordion-1"
          aria-label="roomelement"
          defaultChecked
        />
      </div>
      {hotels.map((hotel) => {
        <HotelItem hotel={hotel} />;
      })}
    </>
  );
};

export default Accordeon;
