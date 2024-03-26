package nl.itvitae.BookingApp.hotelroomtype;

import java.util.List;
import nl.itvitae.BookingApp.image.ImageDTO;

public record HotelRoomTypeDTO(
    Long id,
    Long hotelId,
    RoomType type,
    String name,
    double price,
    String description,
    List<ImageDTO> base64Images,
    int quantity) {

  public static HotelRoomTypeDTO createHotelRoomTypeDTO(HotelRoomType hotelRoomType) {
    return new HotelRoomTypeDTO(
        hotelRoomType.getId(),
        hotelRoomType.getHotel().getId(),
        hotelRoomType.getType(),
        hotelRoomType.getName(),
        hotelRoomType.getPrice().doubleValue(),
        hotelRoomType.getDescription(),
        hotelRoomType.getBase64Images().stream().map(ImageDTO::new).toList(),
        1);
  }
}
