import Carousel from './Carousel';
import PreviewImage from '../images/PreviewImage';
import { usePopup } from '../popup/PopupContext';
import BookingConfirmation from '../booking/BookingConfirmation';
import RequireAuth from '../auth/RequireAuth';
import { useSearchParams } from '../searchbar/SearchParamsContext';
import { useEffect, useState } from 'react';

const RoomCard = ({ roomType, index }) => {
  const { setPopupContent, togglePopup } = usePopup();
  const { roomsSearched } = useSearchParams();

  const openBookingConfirmation = () => {
    setPopupContent(<BookingConfirmation roomType={roomType} />);
    togglePopup();
  };

  if (!roomType) return;
  return (
    <div className="collapse join-item bg-base-200 my-0.5">
      <input
        type="radio"
        name="my-accordion-1"
        aria-label="roomType-item"
        defaultChecked={index === 0}
      />

      <div className="collapse-title prose">
        <div className="flex items-center gap-4">
          <PreviewImage image={roomType.base64Images[0]?.base64Image} />
          <h2 className="m-0">{roomType.name}</h2>
        </div>
      </div>
      <div className="collapse-title prose">
        <div className="flex items-center gap-4">
          <PreviewImage image={roomType.base64Images[0]?.base64Image} />
          <h2 className="m-0">{roomType.name}</h2>
        </div>
      </div>

      {roomsSearched && (
        <div className="collapse-title flex justify-end items-center">
          <p className="text-red-400 m-1">
            {roomType.amountOfRooms > 0 && roomType.amountOfRooms <= 5
              ? `Only ${roomType.amountOfRooms} left`
              : 'No rooms left'}
          </p>
        </div>
      )}

      <div className="collapse-content ">
        <div className="card lg:card-side bg-base-100">
          <div className="flex flex-col items-center w-1/2">
            {roomType && <Carousel images={roomType.base64Images} />}
          </div>
          <div className="flex flex-col w-1/2 m-4">
            <div className="flex h-1/2 flex-grow">{roomType.description}</div>

            <div className="flex justify-end items-center">
              <div className="flex mr-5">Price: €{roomType.price}</div>

              <div className="card-actions justify-end flex flex-col">
                <button
                  onClick={openBookingConfirmation}
                  className={'btn btn-secondary'}
                  disabled={roomType.amountOfRooms === 0}
                >
                  Book now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomCard;
