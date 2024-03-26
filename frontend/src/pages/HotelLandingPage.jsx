import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import RoomCard from '@/components/room/RoomCard';
import Accordion from '@/components/common/Accordion';
import SearchBar from '@/components/searchbar/Searchbar';
import stockHotelImage from '@/images/Hotel.jpeg';
import { fetchHotelRoomTypesByHotelId } from '@/api/hotelRoomTypesApi';
import { getHotelById } from '@/api/hotelApi';

const HotelLandingPage = () => {
  const [hotel, setHotel] = useState({});
  const [roomTypes, setRoomTypes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    const loadHotelRoomTypes = async () => {
      const fetchedRoomTypes = await fetchHotelRoomTypesByHotelId({
        hotelId: id,
      });
      const fetchedHotel = await getHotelById(id);
      setRoomTypes(fetchedRoomTypes);
      console.table(fetchedRoomTypes);
      setHotel(fetchedHotel);
      setIsLoading(false);
    };

    loadHotelRoomTypes();
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
          backgroundImage: `url('${roomTypes[2]?.hotelRoomTypeDTO.images[0].base64Image || stockHotelImage}')`,
        }}
        className="min-h-96 bg-center bg-no-repeat bg-cover bg-fixed"
      ></div>
      <SearchBar isLocationFixed />
      <h1 className="flex text-xl w-full justify-center">
        {roomTypes.length} accommodations found
      </h1>
      <Accordion>
        {roomTypes.map((roomType, index) => (
          <RoomCard
            key={roomType.hotelRoomTypeDTO.id}
            roomType={roomType.hotelRoomTypeDTO}
            index={index}
          />
        ))}
      </Accordion>
    </>
  );
};

export default HotelLandingPage;
