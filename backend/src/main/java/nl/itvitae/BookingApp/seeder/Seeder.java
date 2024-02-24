package nl.itvitae.BookingApp.seeder;

import lombok.RequiredArgsConstructor;
import nl.itvitae.BookingApp.hotel.Hotel;
import nl.itvitae.BookingApp.hotel.HotelRepository;
import nl.itvitae.BookingApp.hotel.Location;
import nl.itvitae.BookingApp.room.Room;
import nl.itvitae.BookingApp.room.RoomRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import javax.sql.rowset.serial.SerialBlob;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.SQLException;
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
                        new Hotel("Motel One", 1, Location.ROTTERDAM,
                                "Nestled in the bustling city of Rotterdam, Motel One offers cozy rooms equipped with all essential amenities. Ideal for travelers on a budget, it provides a comfortable stay without compromising on quality or convenience."),

                        new Hotel("Hilton Riverside", 5, Location.AMSTERDAM,
                                "Experience unparalleled luxury at Hilton Riverside. This 5-star hotel boasts scenic canal views, exquisite dining options, and a tranquil spa. It's the perfect retreat for those seeking a lavish escape in the heart of Amsterdam."),

                        new Hotel("Prague Inn", 4, Location.PRAGUE,
                                "Located centrally in the historic city of Prague, Prague Inn offers comfortable accommodations with easy access to the city's major attractions. Enjoy modern comforts in a charming setting, ideal for both leisure and business travelers."),

                        new Hotel("Rotterdam Stay", 3, Location.ROTTERDAM,
                                "Affordable, convenient, and close to key sites, Rotterdam Stay provides a hassle-free experience for visitors. With modern amenities and comfortable rooms, it's a great base for exploring Rotterdam."),

                        new Hotel("Amsterdam Boutique", 4, Location.AMSTERDAM,
                                "Amsterdam Boutique Hotel offers a unique and charming stay, combining traditional architecture with modern luxury. Situated in the vibrant heart of the city, guests are just steps away from Amsterdam's famous attractions."),

                        new Hotel("Prague Castle Hotel", 5, Location.PRAGUE,
                                "Elegant and steeped in history, Prague Castle Hotel sits at the doorstep of the world-renowned Prague Castle. Offering luxurious rooms, exceptional service, and breathtaking views, it's a stay fit for royalty."),

                        new Hotel("The Rotterdam Hostel", 2, Location.ROTTERDAM,
                                "A friendly and vibrant atmosphere awaits at The Rotterdam Hostel, perfect for backpackers and budget travelers. Enjoy social spaces, clean dorms, and the lively spirit of Rotterdam."),

                        new Hotel("Canal Side Amsterdam", 3, Location.AMSTERDAM,
                                "Relax in the picturesque setting of Canal Side Amsterdam. This charming hotel offers serene canal views, cozy rooms, and is ideally located for guests to explore the enchanting city of Amsterdam."),

                        new Hotel("Old Town Prague", 4, Location.PRAGUE,
                                "Immerse yourself in history at Old Town Prague Hotel, nestled within a historic building that has been modernized to offer all the comforts. A stone's throw from the Old Town Square, it's the perfect starting point for your Prague adventure."),

                        new Hotel("EuroStay Rotterdam", 3, Location.ROTTERDAM,
                                "EuroStay Rotterdam offers practical accommodations close to transport links, making it easy for guests to navigate the city. With comfortable rooms and essential amenities, it's ideal for business travelers and tourists alike."),

                        new Hotel("The Dutchman", 5, Location.AMSTERDAM,
                                "The Dutchman Hotel exudes luxury with a personal touch. Situated in the heart of Amsterdam, it provides an intimate and bespoke experience, with meticulously designed rooms and personalized services."),

                        new Hotel("Prague Riverside", 3, Location.PRAGUE,
                                "Enjoy the beautiful views and comfort at Prague Riverside. Located along the serene riverside, this hotel offers a peaceful retreat with easy access to Prague's bustling city life."),

                        new Hotel("Rotterdam Plaza", 4, Location.ROTTERDAM,
                                "Rotterdam Plaza features modern architecture and excellent service. With state-of-the-art amenities and spacious rooms, it's a preferred choice for travelers seeking style and convenience."),

                        new Hotel("Amsterdam Central", 4, Location.AMSTERDAM,
                                "Convenience meets comfort at Amsterdam Central. This modern hotel is strategically located near Amsterdam Central Station, offering easy access to the city's diverse attractions and a comfortable stay."),

                        new Hotel("Prague Loft", 2, Location.PRAGUE,
                                "Bohemian and affordable, the Prague Loft offers a unique stay in a vibrant neighborhood. Enjoy the artistic decor and friendly atmosphere, perfect for young travelers and those seeking an unconventional experience.")
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
