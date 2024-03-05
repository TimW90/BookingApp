package nl.itvitae.BookingApp.hotel;

import java.util.List;
import nl.itvitae.BookingApp.room.Room;

public record HotelDTO(
    Long id,
    String name,
    int rating,
    Location location,
    String description,
    String base64Image,
    List<Room> rooms) {
  public HotelDTO(Hotel hotel) {
    this(
        hotel.getId(),
        hotel.getName(),
        hotel.getRating(),
        hotel.getLocation(),
        hotel.getDescription(),
        hotel.getBase64Image(),
        hotel.getRooms());
  }
}
