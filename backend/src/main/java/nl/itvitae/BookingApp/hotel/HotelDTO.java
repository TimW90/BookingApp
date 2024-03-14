package nl.itvitae.BookingApp.hotel;

import java.util.Comparator;
import java.util.List;
import nl.itvitae.BookingApp.room.Room;
import nl.itvitae.BookingApp.room.RoomDTO;

public record HotelDTO(
    Long id,
    String name,
    int starRating,
    Location location,
    String description,
    String base64Image,
    List<RoomDTO> rooms) {
  public HotelDTO(Hotel hotel) {
    this(
        hotel.getId(),
        hotel.getName(),
        hotel.getStarRating(),
        hotel.getLocation(),
        hotel.getDescription(),
        hotel.getBase64Image(),
        hotel.getRooms().stream().map(RoomDTO::new).toList());
  }
}
