package nl.itvitae.BookingApp.hotel;

import nl.itvitae.BookingApp.hotelroomtype.HotelRoomType;
import nl.itvitae.BookingApp.room.RoomDTO;

import java.util.List;

public record HotelDTO(
    Long id,
    String name,
    String starRating,
    Location location,
    String description,
    String base64Image,
    List<HotelRoomTypeDTO> hotelRoomTypes) {
  public HotelDTO(Hotel hotel) {
    this(
        hotel.getId(),
        hotel.getName(),
        String.valueOf(hotel.getStarRating()),
        hotel.getLocation(),
        hotel.getDescription(),
        hotel.getBase64Image(),
        hotel.get
  }
}
