package nl.itvitae.BookingApp.seeder;

import lombok.RequiredArgsConstructor;
import nl.itvitae.BookingApp.hotel.Hotel;
import nl.itvitae.BookingApp.hotel.HotelRepository;
import nl.itvitae.BookingApp.hotel.Location;
import nl.itvitae.BookingApp.room.Room;
import nl.itvitae.BookingApp.room.RoomRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Set;

@RequiredArgsConstructor
@Component
public class Seeder implements CommandLineRunner {

    private final HotelRepository hotelRepository;
    private final RoomRepository roomRepository;

    @Override
    public void run(String... args) throws Exception {
        seedHotels();
        seedRooms();
    }

    public void seedHotels() {
        hotelRepository.saveAll(
                List.of(
                        new Hotel("Motel", 1, Location.ROTTERDAM),
                        new Hotel("Hilton", 5, Location.AMSTERDAM)
                ));
    }

    public void seedRooms() {
        roomRepository.saveAll(List.of(
                new Room(Room.Type.SINGLE, 12000, Set.of(Room.Amenity.GYM, Room.Amenity.WIFI, Room.Amenity.SINGLE_BED), false),
                new Room(Room.Type.SINGLE, 13500, Set.of(Room.Amenity.GYM, Room.Amenity.WIFI, Room.Amenity.SINGLE_BED, Room.Amenity.BREAKFAST), false),
                new Room(Room.Type.DOUBLE, 22000, Set.of(Room.Amenity.GYM, Room.Amenity.WIFI, Room.Amenity.DOUBLE_BED), false),
                new Room(Room.Type.TRIPPLE, 30000, Set.of(Room.Amenity.GYM, Room.Amenity.WIFI, Room.Amenity.DOUBLE_BED, Room.Amenity.SINGLE_BED), false),
                new Room(Room.Type.QUADRUPPLE, 40000, Set.of(Room.Amenity.GYM, Room.Amenity.WIFI, Room.Amenity.DOUBLE_BED, Room.Amenity.SINGLE_BED), false)
        ));
    }
}
