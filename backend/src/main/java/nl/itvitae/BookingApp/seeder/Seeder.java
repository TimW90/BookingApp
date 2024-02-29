package nl.itvitae.BookingApp.seeder;

import static nl.itvitae.BookingApp.util.ImageUtil.createBlobFromImagePath;

import java.util.List;
import java.util.Set;
import lombok.RequiredArgsConstructor;
import nl.itvitae.BookingApp.hotel.Hotel;
import nl.itvitae.BookingApp.hotel.HotelRepository;
import nl.itvitae.BookingApp.hotel.Location;
import nl.itvitae.BookingApp.room.Room;
import nl.itvitae.BookingApp.room.RoomRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

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
            new Hotel(
                "Motel One",
                1,
                Location.ROTTERDAM,
                "Nestled in the bustling city of Rotterdam, Motel One offers cozy rooms equipped with all essential amenities. Ideal for travelers on a budget, it provides a comfortable stay without compromising on quality or convenience.",
                createBlobFromImagePath("src/main/resources/images/motel_rotterdam.png")),
            new Hotel(
                "Hilton Riverside",
                5,
                Location.AMSTERDAM,
                "Experience unparalleled luxury at Hilton Riverside. This 5-star hotel boasts scenic canal views, exquisite dining options, and a tranquil spa. It's the perfect retreat for those seeking a lavish escape in the heart of Amsterdam.",
                createBlobFromImagePath("src/main/resources/images/hilton_amsterdam.png")),
            new Hotel(
                "Prague Inn",
                4,
                Location.PRAGUE,
                "Located centrally in the historic city of Prague, Prague Inn offers comfortable accommodations with easy access to the city's major attractions. Enjoy modern comforts in a charming setting, ideal for both leisure and business travelers.",
                createBlobFromImagePath("src/main/resources/images/prague_inn.png")),
            new Hotel(
                "Rotterdam Stay",
                3,
                Location.ROTTERDAM,
                "Affordable, convenient, and close to key sites, Rotterdam Stay provides a hassle-free experience for visitors. With modern amenities and comfortable rooms, it's a great base for exploring Rotterdam.",
                createBlobFromImagePath("src/main/resources/images/rotterdam_stay.png")),
            new Hotel(
                "Amsterdam Boutique",
                4,
                Location.AMSTERDAM,
                "Amsterdam Boutique Hotel offers a unique and charming stay, combining traditional architecture with modern luxury. Situated in the vibrant heart of the city, guests are just steps away from Amsterdam's famous attractions.",
                createBlobFromImagePath("src/main/resources/images/amsterdam_boutique.png"))));
  }

  public void seedRooms() {
    roomRepository.saveAll(
        List.of(
            new Room(
                Room.Type.SINGLE,
                12000,
                false),
            new Room(
                Room.Type.SINGLE,
                13500,
                false),
            new Room(
                Room.Type.DOUBLE,
                22000,
                false),
            new Room(
                Room.Type.TRIPPLE,
                30000,
                false),
            new Room(
                Room.Type.QUADRUPPLE,
                40000,
                false)));
  }
}
