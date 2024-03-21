import Carousel from './Carousel';
import PreviewImage from '../images/PreviewImage';
import { usePopup } from '../popup/PopupContext';
import BookingConfirmation from '../booking/BookingConfirmation';
import RequireAuth from '../auth/RequireAuth';

const RoomCard = ({ room, index }) => {
  const { setPopupContent, togglePopup } = usePopup();

  if (!room) return;

  const openBookingConfirmation = () => {
    setPopupContent(<BookingConfirmation room={room} />);
    togglePopup();
  };

  return (
    <div className="collapse join-item bg-base-200 my-0.5">
      <input
        type="radio"
        name="my-accordion-1"
        aria-label="room-item"
        defaultChecked={index === 0}
      />

      <div className="collapse-title prose">
        <div className="flex items-center gap-4">
          <PreviewImage image={room.base64Images[0].base64Image} />
          <h2 className="m-0">{room.name}</h2>
        </div>
      </div>

      <div className="collapse-content">
        <div className="card lg:card-side bg-base-100">
          <div className="flex flex-col items-center w-1/2">
            {room && <Carousel images={room.base64Images} />}
          </div>
          <div className="room-properties flex flex-col w-1/2">
            <div className="flex h-1/2">{room.description}</div>

            <div className="inline-flex justify-end items-center">
              <div className="flex mr-5">Price: €{room.price}</div>

              <div className="card-actions justify-end flex flex-col">
                <button
                  onClick={openBookingConfirmation}
                  className="btn btn-secondary"
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
