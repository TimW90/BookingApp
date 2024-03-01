import { useState, useEffect } from 'react';
import axios from 'axios';
import Carousel from './Carousel';

const RoomCard = () => {
  const [room, setRoom] = useState('');

  useEffect(() => {
    const loadRoom = async () => {
      const fetchedRoom = await axios.get(
        'http://localhost:8080/api/v1/rooms/3'
      );
      setRoom(fetchedRoom.data);
      console.log(fetchedRoom.data);
    };

    loadRoom();
  }, []);

  return (
    <>
      <div className="card-body">
        <h2 className="card-title">Room title</h2>
        <div className="card lg:card-side bg-base-100 flex-row">
          <div className="flex flex-col items-center w-1/2">
            {room && <Carousel images={room.base64Images} />}
          </div>
          <div className="room-properties flex flex-col w-1/2">
            <div className="flex h-1/2">{room.description}</div>
            <div className="flex">Price: €{room.price}</div>
          </div>
          {/* <div className="card-actions justify-end flex flex-col">
            <button className="btn btn-primary">Reserve</button>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default RoomCard;
