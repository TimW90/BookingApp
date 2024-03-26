package nl.itvitae.BookingApp.hotel;

import java.util.List;
import nl.itvitae.BookingApp.hotelroomtype.HotelRoomTypeDTO;
import nl.itvitae.BookingApp.util.ImageUtil;

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
        ImageUtil.convertImagePathToBase64String(hotel.getImagePath()),
        hotel.getHotelRoomTypes().stream().map(HotelRoomTypeDTO::createHotelRoomTypeDTO).toList());
  }
}
