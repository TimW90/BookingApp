import DetailImage from "../images/DetailImage";

const BookingConfirmation = ({ room, onConfirm }) => {
  console.log(room);
  if (!room) return;

  return (
    <div className="prose p-4 max-w-md mx-auto">
      <h2>Confirm Booking</h2>
      <div className="mb-4">
        <h3>{room.name}</h3>
        <p>{room.description}</p>
        <p>Price: €{room.price}</p>
      </div>
      <div className="flex flex-col justify-between items-center mt-4">
        <DetailImage image={room.base64Images[0].base64Image}/>
        <button
          className="btn btn-secondary py-2"
          onClick={onConfirm}
        >
          Confirm Booking
        </button>
      </div>
      
    </div>
  );
};

export default BookingConfirmation;
