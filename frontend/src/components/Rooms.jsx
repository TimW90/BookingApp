import { useState, useEffect } from 'react';
import axios from 'axios';

const Rooms = () => {
    const [rooms, setRooms] = useState([]);

      useEffect(() => {
      async function fetchRooms() {
        const response = await axios.get("http://localhost:8080/api/v1/rooms");
        setRooms(response.data);
      }

      fetchRooms();
    }, []);

    return (
        <>
            <div>
                {rooms.map(room => (
                    <div key={room.id} className='room'>
                    Room id: {room.id} <br />
                    Room type: {room.type} <br />
                    Room price: €{room.price / 100} <br />
                    Room amenities: {room.amenities.map((amenity, index) => {
                                        if (index === room.amenities.length - 1) {
                                            return amenity;
                                        } else {
                                            return amenity + ', ';
                                        }
                                    })}
                    <br />
                    Room luxury: {room.luxury.toString()}
                    <br /> <br />
                    </div>
                ))}
            </div>
        </>
    )
}

export default Rooms;