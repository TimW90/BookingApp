package nl.itvitae.BookingApp.hotelroomtype;

import java.util.List;
import nl.itvitae.BookingApp.image.ImageDTO;

public record HotelRoomTypeDTO(
    Long id,
    Long hotelId,
    String type,
    String name,
    double price,
    String description,
    List<ImageDTO> images) {

  public static HotelRoomTypeDTO(HotelRoomType hotelRoomType) {
    return new HotelRoomTypeDTO(
        hotelRoomType.getId(),
        hotelRoomType.getHotel().getId(),
        hotelRoomType.getType().toString(),
        hotelRoomType.getName(),
        hotelRoomType.getPrice().doubleValue(),
        hotelRoomType.getDescription(),
        hotelRoomType.getImageBase64Strings());
  }
}
