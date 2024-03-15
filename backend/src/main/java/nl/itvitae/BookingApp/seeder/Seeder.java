package nl.itvitae.BookingApp.seeder;

import static nl.itvitae.BookingApp.util.ImageUtil.*;

import java.util.List;
import lombok.RequiredArgsConstructor;
import nl.itvitae.BookingApp.hotel.Hotel;
import nl.itvitae.BookingApp.hotel.HotelRepository;
import nl.itvitae.BookingApp.hotel.Location;
import nl.itvitae.BookingApp.room.Room;
import nl.itvitae.BookingApp.room.RoomRepository;
import nl.itvitae.BookingApp.user.User;
import nl.itvitae.BookingApp.user.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Component
public class Seeder implements CommandLineRunner {

  private final HotelRepository hotelRepository;
  private final RoomRepository roomRepository;
  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;

  @Override
  public void run(String... args) throws Exception {
    seedUsers();
    List<Hotel> seededHotels = seedHotels();
    seedRooms(seededHotels);
  }

  private void seedUsers() {
    userRepository.saveAll(
        List.of(
            new User("John Doe", passwordEncoder.encode("worst"), "user@gmail.com", "USER"),
            new User("John Deere", passwordEncoder.encode("kaas"), "admin@gmail.com", "ADMIN"),
            new User("John Baz", passwordEncoder.encode("scenario"), "dummy@gmail.com", "USER")));
  }

  private List<Hotel> seedHotels() {
    return hotelRepository.saveAll(
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
                "Pestana Amsterdam Riverside",
                4,
                Location.AMSTERDAM,
                "A classical landmark turned haven of minimalist chic, this beautiful hotel in Amsterdam city center is housed in a pair of 19th – century Neo-Renaissance-style buildings and two modern annexes on the banks of the Amstel River. The Pestana Amsterdam Riverside Hotel is rising above the hippest part of town, “De Pijp”, in a quiet location just outside the hustle and bustle of the Amsterdam inner canal belt. With elegant guestrooms and a stunning lobby with beautiful ceilings and arches, this hotel in Amsterdam is the perfect base for your visit to one of Europe´s most picturesque and exciting cities.",
                getImageFromPathAsBase64String("src/main/resources/images/amsterdam_boutique.png")),
            new Hotel(
                "Barcelona Retreat",
                4,
                Location.BARCELONA,
                "Discover the charm of Barcelona with a stay at Barcelona Retreat. Located in the heart of the city, this hotel offers luxury accommodations and easy access to famous landmarks. Enjoy a blend of comfort and Spanish culture.",
                getImageFromPathAsBase64String("src/main/resources/images/barcelona_retreat.webp")),
            new Hotel(
                "Vienna Classic",
                5,
                Location.VIENNA,
                "Immerse yourself in the elegance of Vienna Classic. Situated in Vienna's historical center, this 5-star hotel combines classical architecture with modern amenities for an unforgettable stay.",
                getImageFromPathAsBase64String("src/main/resources/images/vienna_classic.jpg")),
            new Hotel(
                "Berlin Base",
                2,
                Location.BERLIN,
                "Berlin Base offers a no-frills accommodation option for travelers on a budget. Located in Berlin's vibrant heart, it provides easy access to public transport and local attractions.",
                getImageFromPathAsBase64String("src/main/resources/images/berlin_base.jpg")),
            new Hotel(
                "Vienna Vintage Retreat",
                3,
                Location.VIENNA,
                "Discover the charm of old-world Vienna with a modern twist. Vienna Vintage Retreat offers a cozy stay, blending historical architecture with contemporary comforts, nestled in the city's cultural heart.",
                getImageFromPathAsBase64String(
                    "src/main/resources/images/vienna_vintage_retreat.jpg")),
            new Hotel(
                "Barcelona Beachfront",
                4,
                Location.BARCELONA,
                "Wake up to the serene views of the Mediterranean at Barcelona Beachfront. This hotel combines luxury with an unbeatable location, right on the sandy shores, perfect for a sun-soaked escape.",
                getImageFromPathAsBase64String(
                    "src/main/resources/images/barcelona_beachfront.webp")),
            new Hotel(
                "Prague Castle View",
                5,
                Location.PRAGUE,
                "Perched on a hill overlooking the historic Prague Castle, our hotel offers breathtaking views and luxury accommodations. Prague Castle View is an ideal spot for those who wish to immerse themselves in the city's majestic history.",
                getImageFromPathAsBase64String("src/main/resources/images/prague_castle_view.jpg")),
            new Hotel(
                "Berlin Art Hotel",
                4,
                Location.BERLIN,
                "Berlin Art Hotel is a celebration of creativity and innovation. Located in the vibrant heart of Berlin, it offers guests an artistic and comfortable stay, surrounded by galleries and modern art.",
                getImageFromPathAsBase64String("src/main/resources/images/berlin_art_hotel.jpg")),
            new Hotel(
                "Rotterdam Dockside",
                2,
                Location.ROTTERDAM,
                "Rotterdam Dockside provides a unique experience with its maritime theme and location near the bustling port. It's an affordable choice for travelers seeking adventure and industrial charm.",
                getImageFromPathAsBase64String(
                    "src/main/resources/images/rotterdam_dockside.jpg"))));
  }

  private void seedRooms(List<Hotel> seededHotels) {
    seededHotels.forEach(
        (hotel) -> {
          hotel
              .getRooms()
              .addAll(
                  List.of(
                      new Room(Room.Type.SINGLE, 12000, false),
                      new Room(Room.Type.SINGLE, 13500, false),
                      new Room(Room.Type.DOUBLE, 22000, false),
                      new Room(Room.Type.TRIPPLE, 30000, false),
                      new Room(Room.Type.QUADRUPPLE, 40000, false)));
        });

    hotelRepository.saveAll(seededHotels);
  }
}
