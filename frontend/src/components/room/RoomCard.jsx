import { useState, useEffect } from 'react';
import axios from 'axios';
import Carousel from './Carousel';

const RoomCard = ({ room }) => {
  if (!room) return;

  return (
    <>
      <div className="card-body">
        <h2 className="card-title">{room.name}</h2>
        <div className="card lg:card-side bg-base-100">
          <div className="flex flex-col items-center w-1/2">
            {room && <Carousel images={room.base64Images} />}
          </div>
          <div className="room-properties flex flex-col w-1/2">
            <div className="flex h-1/2">{room.description}</div>
            <div className="inline-flex justify-end items-center">
              <div className="flex mr-5">Price: €{room.price}</div>
              {/* <div className="card-actions justify-end flex flex-col">
                <button className="btn btn-primary">Book now</button>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomCard;
