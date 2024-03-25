package nl.itvitae.BookingApp.seeder;

import static nl.itvitae.BookingApp.util.ImageUtil.*;

import jakarta.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;
import lombok.RequiredArgsConstructor;
import nl.itvitae.BookingApp.booking.Booking;
import nl.itvitae.BookingApp.booking.BookingRepository;
import nl.itvitae.BookingApp.hotel.Hotel;
import nl.itvitae.BookingApp.hotel.HotelRepository;
import nl.itvitae.BookingApp.hotel.Location;
import nl.itvitae.BookingApp.hotelroomtype.HotelRoomType;
import nl.itvitae.BookingApp.hotelroomtype.HotelRoomTypeRepository;
import nl.itvitae.BookingApp.hotelroomtype.RoomType;
import nl.itvitae.BookingApp.image.Image;
import nl.itvitae.BookingApp.image.ImageRepository;
import nl.itvitae.BookingApp.room.Room;
import nl.itvitae.BookingApp.room.RoomRepository;
import nl.itvitae.BookingApp.user.User;
import nl.itvitae.BookingApp.user.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@RequiredArgsConstructor
@Transactional
@Component
public class Seeder implements CommandLineRunner {

  private final HotelRepository hotelRepository;
  private final RoomRepository roomRepository;
  private final ImageRepository imageRepository;
  private final HotelRoomTypeRepository hotelRoomTypeRepository;
  private final BookingRepository bookingRepository;
  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;

  @Override
  public void run(String... args) throws Exception {
    if (userRepository.count() == 0) {
      seedUsers();
    }

    if (hotelRepository.count() == 0) {
      seedHotels();
    }

    if (hotelRoomTypeRepository.count() == 0) {
      seedHotelRoomTypes();
    }

    if (roomRepository.count() == 0) {
      seedRooms();
    }

    if (bookingRepository.count() == 0) {
      seedBookings();
    }
  }

  private void seedUsers() {
    userRepository.saveAll(
        List.of(
            new User("John Doe", passwordEncoder.encode("worst"), "user@gmail.com", "USER"),
            new User("John Deere", passwordEncoder.encode("kaas"), "admin@gmail.com", "ADMIN"),
            new User("John Baz", passwordEncoder.encode("scenario"), "dummy@gmail.com", "USER")));
  }

  private void seedHotels() {
    hotelRepository.saveAll(
        List.of(
            new Hotel(
                "Motel One",
                1,
                Location.ROTTERDAM,
                "Nestled in the bustling city of Rotterdam, Motel One offers cozy rooms equipped with all essential amenities. Ideal for travelers on a budget, it provides a comfortable stay without compromising on quality or convenience.",
                "src/main/resources/static/images/motel_rotterdam.png"),
            new Hotel(
                "Hilton Riverside",
                5,
                Location.AMSTERDAM,
                "Experience unparalleled luxury at Hilton Riverside. This 5-star hotel boasts scenic canal views, exquisite dining options, and a tranquil spa. It's the perfect retreat for those seeking a lavish escape in the heart of Amsterdam.",
                "src/main/resources/static/images/hilton_amsterdam.png"),
            new Hotel(
                "Prague Inn",
                4,
                Location.PRAGUE,
                "Located centrally in the historic city of Prague, Prague Inn offers comfortable accommodations with easy access to the city's major attractions. Enjoy modern comforts in a charming setting, ideal for both leisure and business travelers.",
                "src/main/resources/static/images/prague_inn.png"),
            new Hotel(
                "Rotterdam Stay",
                3,
                Location.ROTTERDAM,
                "Affordable, convenient, and close to key sites, Rotterdam Stay provides a hassle-free experience for visitors. With modern amenities and comfortable rooms, it's a great base for exploring Rotterdam.",
                "src/main/resources/static/images/rotterdam_stay.png"),
            new Hotel(
                "Pestana Amsterdam Riverside",
                4,
                Location.AMSTERDAM,
                "A classical landmark turned haven of minimalist chic, this beautiful hotel in Amsterdam city center is housed in a pair of 19th – century Neo-Renaissance-style buildings and two modern annexes on the banks of the Amstel River. The Pestana Amsterdam Riverside Hotel is rising above the hippest part of town, “De Pijp”, in a quiet location just outside the hustle and bustle of the Amsterdam inner canal belt. With elegant guestrooms and a stunning lobby with beautiful ceilings and arches, this hotel in Amsterdam is the perfect base for your visit to one of Europe´s most picturesque and exciting cities.",
                "src/main/resources/static/images/amsterdam_boutique.png"),
            new Hotel(
                "Barcelona Retreat",
                4,
                Location.BARCELONA,
                "Discover the charm of Barcelona with a stay at Barcelona Retreat. Located in the heart of the city, this hotel offers luxury accommodations and easy access to famous landmarks. Enjoy a blend of comfort and Spanish culture.",
                "src/main/resources/static/images/barcelona_retreat.webp"),
            new Hotel(
                "Vienna Classic",
                5,
                Location.VIENNA,
                "Immerse yourself in the elegance of Vienna Classic. Situated in Vienna's historical center, this 5-star hotel combines classical architecture with modern amenities for an unforgettable stay.",
                "src/main/resources/static/images/vienna_classic.jpg"),
            new Hotel(
                "Berlin Base",
                2,
                Location.BERLIN,
                "Berlin Base offers a no-frills accommodation option for travelers on a budget. Located in Berlin's vibrant heart, it provides easy access to public transport and local attractions.",
                "src/main/resources/static/images/berlin_base.jpg"),
            new Hotel(
                "Vienna Vintage Retreat",
                3,
                Location.VIENNA,
                "Discover the charm of old-world Vienna with a modern twist. Vienna Vintage Retreat offers a cozy stay, blending historical architecture with contemporary comforts, nestled in the city's cultural heart.",
                "src/main/resources/static/images/vienna_vintage_retreat.jpg"),
            new Hotel(
                "Barcelona Beachfront",
                4,
                Location.BARCELONA,
                "Wake up to the serene views of the Mediterranean at Barcelona Beachfront. This hotel combines luxury with an unbeatable location, right on the sandy shores, perfect for a sun-soaked escape.",
                "src/main/resources/static/images/barcelona_beachfront.webp"),
            new Hotel(
                "Prague Castle View",
                5,
                Location.PRAGUE,
                "Perched on a hill overlooking the historic Prague Castle, our hotel offers breathtaking views and luxury accommodations. Prague Castle View is an ideal spot for those who wish to immerse themselves in the city's majestic history.",
                "src/main/resources/static/images/prague_castle_view.jpg"),
            new Hotel(
                "Berlin Art Hotel",
                4,
                Location.BERLIN,
                "Berlin Art Hotel is a celebration of creativity and innovation. Located in the vibrant heart of Berlin, it offers guests an artistic and comfortable stay, surrounded by galleries and modern art.",
                "src/main/resources/static/images/berlin_art_hotel.jpg"),
            new Hotel(
                "Rotterdam Dockside",
                2,
                Location.ROTTERDAM,
                "Rotterdam Dockside provides a unique experience with its maritime theme and location near the bustling port. It's an affordable choice for travelers seeking adventure and industrial charm.",
                "src/main/resources/static/images/rotterdam_dockside.jpg")));
  }

  private HotelRoomType saveHotelRoomType(
      Hotel hotel,
      RoomType type,
      String name,
      double price,
      String description,
      List<String> imagePaths) {

    HotelRoomType hotelRoomType = new HotelRoomType(hotel, type, name, price, description);
    hotelRoomTypeRepository.save(hotelRoomType);
    hotel.getHotelRoomTypes().add(hotelRoomType);

    for (String imagePath : imagePaths) {
      int imageNumber = 1;
      Image image = new Image(imagePath, imageNumber++);
      imageRepository.save(image);
      hotelRoomType.getImagePaths().add(image);
      image.setHotelRoomType(hotelRoomType);
    }
    return hotelRoomType;
  }

  private void seedHotelRoomTypes() {
    List<Hotel> seedHotels = hotelRepository.findAll();

    for (Hotel hotel : seedHotels) {
      hotelRoomTypeRepository.saveAll(
          List.of(
              saveHotelRoomType(
                  hotel,
                  RoomType.SINGLE_ROOM,
                  "Single Comfort Room",
                  120,
                  "A nice and cozy room for one person",
                  List.of("src/main/resources/static/images/room_1_1.png")),
              saveHotelRoomType(
                  hotel,
                  RoomType.DOUBLE_ROOM,
                  "Double Comfort Room",
                  220,
                  "A nice and cozy room for two persons",
                  List.of(
                      "src/main/resources/static/images/room_2_1.png",
                      "src/main/resources/static/images/room_2_2.png")),
              saveHotelRoomType(
                  hotel,
                  RoomType.QUADRUPLE_ROOM,
                  "Quadruple Deluxe Room",
                  400,
                  "A big luxurious room for up to four persons",
                  List.of(
                      "src/main/resources/static/images/room_3_1.png",
                      "src/main/resources/static/images/room_3_2.png",
                      "src/main/resources/static/images/room_3_3.png"))));
    }
  }

  private void seedRooms() {
    List<HotelRoomType> seededHotelRoomTypes = hotelRoomTypeRepository.findAll();

    int minRooms = 4, maxRooms = 10;
    for (HotelRoomType hotelRoomType : seededHotelRoomTypes) {
      int roomCount = (int) (Math.random() * maxRooms - minRooms + 1) + minRooms;

      for (int i = 0; i < roomCount; i++) {
        Room newRoom = new Room(hotelRoomType);
        roomRepository.save(newRoom);
        hotelRoomType.getRooms().add(newRoom);
      }
    }
  }

  private void seedBookings() {
    // For simplicity, we'll just use the first user and alternate rooms
    User bookingUser = userRepository.findAll().getFirst(); // Has role USER
    List<Hotel> hotels = hotelRepository.findAll();

    LocalDate checkInDate = LocalDate.now().minusYears(1).minusMonths(6);
    LocalDate checkOutDate = checkInDate.plusDays(5);

    for (Hotel hotel : hotels) {
      for (HotelRoomType hotelRoomType : hotel.getHotelRoomTypes()) {

          Room availableRoom = hotelRoomTypeRepository.findAvailableRoomsForHotelRoomType(hotelRoomType, checkInDate, checkOutDate).getFirst();
          Booking newBooking = new Booking(checkInDate, checkOutDate, bookingUser, availableRoom);
          bookingRepository.save(newBooking);
          bookingUser.addBooking(newBooking);


        // Update check-in/check-out dates for variety
        checkInDate = checkInDate.plusDays(10);
        checkOutDate = checkOutDate.plusDays(15);
      }
    }
  }
}
