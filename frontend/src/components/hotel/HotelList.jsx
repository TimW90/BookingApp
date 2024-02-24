import { useEffect, useState } from 'react';
import { getHotels } from '@/api/hotelApi';
import StarRating from './StarRating';
import { getHotelImageById } from '@/api/imageApi';

const HotelList = () => {
  const [hotels, setHotels] = useState([]);
  const [testHotelImage, setTestHotelImage] = useState(null);

  useEffect(() => {
    const loadHotels = async () => {
      const fetchedHotels = await getHotels();
      setHotels(fetchedHotels);
      const fetchedImage = await getHotelImageById(16);
      console.log(fetchedImage);
      setTestHotelImage(fetchedImage);
    };

    loadHotels();
  }, []);

  return (
    <>
      {hotels.map((hotel) => (
        <div key="hotel.id" className="collapse bg-base-200 px-12">
          {hotel.id === 1 ? (
            <input
              type="radio"
              name="my-accordion-1"
              aria-label="hotel-item"
              defaultChecked
            />
          ) : (
            <input type="radio" name="my-accordion-1" aria-label="hotel-item" />
          )}

          <div className="flex items-center justify-between collapse-title prose min-w-full">
            <h2 className="m-0">{hotel.name}</h2>
            <StarRating amountOfStars={hotel.rating} />
          </div>

          <div className="collapse-content flex">
            <div className="w-2/5 prose card-bordered">
              <h3 className="m-0">Description</h3>
              <hr className="mb-2"></hr>
              <p>{hotel.description}</p>
            </div>
            <img alt="hotel image" src={testHotelImage}></img>
          </div>
        </div>
      ))}
    </>
  );
};

export default HotelList;
