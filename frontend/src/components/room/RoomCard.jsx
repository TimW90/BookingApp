import { useState, useEffect } from 'react';
import axios from 'axios';
import Carousel from './Carousel';

const RoomCard = () => {
  const images = [
    'https://assets.vandervalkonline.com/inc/hotels/37/rooms/250/1024x768_2023%252D09%252D04%252DVDV%252DAmersfoort%252D0032%252Ejpg&w=2048&h=1152&fmt=webp',
    // 'https://assets.vandervalkonline.com/inc/hotels/37/rooms/250/1024x768_2023%252D09%252D04%252DVDV%252DAmersfoort%252D0073%252Ejpg&w=2048&h=1152&fmt=webp',
  ];

  return (
    <>
      <div className="card-body">
        <h2 className="card-title">Room title</h2>
        <div className="card lg:card-side bg-base-100 flex-row">
          <div className="flex flex-col items-center min-w-1/2">
            <Carousel images={images} />
          </div>
          <div className="flex">
            Description.........................................................
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
