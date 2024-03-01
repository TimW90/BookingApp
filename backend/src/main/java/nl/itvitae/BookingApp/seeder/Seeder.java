package nl.itvitae.BookingApp.seeder;

import static nl.itvitae.BookingApp.util.ImageUtil.*;

import java.util.List;
import java.util.Set;

import lombok.RequiredArgsConstructor;
import nl.itvitae.BookingApp.hotel.Hotel;
import nl.itvitae.BookingApp.hotel.HotelRepository;
import nl.itvitae.BookingApp.hotel.Location;
import nl.itvitae.BookingApp.image.Image;
import nl.itvitae.BookingApp.image.ImageRepository;
import nl.itvitae.BookingApp.room.Room;
import nl.itvitae.BookingApp.room.RoomRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@RequiredArgsConstructor
@Component
public class Seeder implements CommandLineRunner {

    private final HotelRepository hotelRepository;
    private final RoomRepository roomRepository;
    private final ImageRepository imageRepository;

    @Override
    public void run(String... args) throws Exception {
        seedHotels();
        seedRooms();
    }

    public void seedHotels() {
        hotelRepository.saveAll(
                List.of(
                        new Hotel(
                                "Motel One",
                                1,
                                Location.ROTTERDAM,
                                "Nestled in the bustling city of Rotterdam, Motel One offers cozy rooms equipped with all essential amenities. Ideal for travelers on a budget, it provides a comfortable stay without compromising on quality or convenience.",
                                getImageFromPathAsBase64String("src/main/resources/images/motel_rotterdam.png")),
                        new Hotel(
                                "Hilton Riverside",
                                5,
                                Location.AMSTERDAM,
                                "Experience unparalleled luxury at Hilton Riverside. This 5-star hotel boasts scenic canal views, exquisite dining options, and a tranquil spa. It's the perfect retreat for those seeking a lavish escape in the heart of Amsterdam.",
                                getImageFromPathAsBase64String("src/main/resources/images/hilton_amsterdam.png")),
                        new Hotel(
                                "Prague Inn",
                                4,
                                Location.PRAGUE,
                                "Located centrally in the historic city of Prague, Prague Inn offers comfortable accommodations with easy access to the city's major attractions. Enjoy modern comforts in a charming setting, ideal for both leisure and business travelers.",
                                getImageFromPathAsBase64String("src/main/resources/images/prague_inn.png")),
                        new Hotel(
                                "Rotterdam Stay",
                                3,
                                Location.ROTTERDAM,
                                "Affordable, convenient, and close to key sites, Rotterdam Stay provides a hassle-free experience for visitors. With modern amenities and comfortable rooms, it's a great base for exploring Rotterdam.",
                                getImageFromPathAsBase64String("src/main/resources/images/rotterdam_stay.png")),
                        new Hotel(
                                "Amsterdam Boutique",
                                4,
                                Location.AMSTERDAM,
                                "Amsterdam Boutique Hotel offers a unique and charming stay, combining traditional architecture with modern luxury. Situated in the vibrant heart of the city, guests are just steps away from Amsterdam's famous attractions.",
                                getImageFromPathAsBase64String(
                                        "src/main/resources/images/amsterdam_boutique.png"))));
    }

    public void seedRooms() {
        // Room 1
        saveRoom(Room.Type.SINGLE, 120, false, "A nice and cozy room for one person", List.of("src/main/resources/images/room_1_1.png"));

        // Room 2
        saveRoom(Room.Type.DOUBLE, 220, false, "A nice and cozy room for two persons", List.of("src/main/resources/images/room_2_1.png", "src/main/resources/images/room_2_2.png"));

        // Room 3
        saveRoom(Room.Type.QUADRUPPLE, 400, true, "A big luxurious room for up to four persons", List.of("src/main/resources/images/room_3_1.png", "src/main/resources/images/room_3_2.png", "src/main/resources/images/room_3_3.png"));
    }

    private void saveRoom(Room.Type type, double price, boolean luxury, String description, List<String> imagePaths) {
        Room room = new Room(type, price, luxury, description);

        for (String imagePath : imagePaths) {
            Image image = new Image(getImageFromPathAsBase64String(imagePath));
            room.getImageBase64Strings().add(image);
            image.setRoom(room);
        }

        roomRepository.save(room);
    }
}
