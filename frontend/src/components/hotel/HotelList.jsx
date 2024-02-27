import { useEffect, useState } from 'react';
import { getHotels } from '@/api/hotelApi';
import StarRating from './StarRating';
import PreviewImage from '../common/PreviewImage';
import DetailImage from '../common/DetailImage';
import AdminButtons from './AdminButtons';

const HotelList = ({ isAdmin }) => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const loadHotels = async () => {
      const fetchedHotels = await getHotels();
      setHotels(fetchedHotels);
    };

    loadHotels();
  }, []);

  return (
    <div className="join join-vertical w-full px-12">
      {hotels.map((hotel) => (
        <div
          key={hotel.id}
          className="collapse join-item bg-base-200 px-12 my-0.5"
        >
          <input
            type={isAdmin ? 'checkbox' : 'radio'}
            name="my-accordion-1"
            aria-label="hotel-item"
            defaultChecked={isAdmin || hotel.id === 1}
          />

          <div className="flex items-center justify-between collapse-title prose min-w-full p-0">
            <div className="flex items-center gap-4">
              <PreviewImage image={hotel.base64Image} />
              <h2 className="m-0">{hotel.name}</h2>

              {isAdmin && <AdminButtons hotel={hotel} />}
            </div>
            <StarRating amountOfStars={hotel.rating} />
          </div>

          <div className="collapse-content flex justify-between">
            <div className="w-2/5 prose card-bordered">
              <h3 className="m-0">Description</h3>
              <hr className="mb-2"></hr>
              <p>{hotel.description}</p>
            </div>
            <DetailImage image={hotel.base64Image} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default HotelList;
