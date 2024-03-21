package nl.itvitae.BookingApp.room;

import nl.itvitae.BookingApp.image.ImageDTO;

import java.math.BigDecimal;
import java.util.Comparator;
import java.util.List;

import static nl.itvitae.BookingApp.util.EnumUtil.enumName;

public record RoomDTO(
    Long id,
    String name,
    Room.Type type,
    double price,
    String description,
    Long hotelId,
    int quantity,
    List<ImageDTO> base64Images) {

  public RoomDTO(Room room) {
    this(
        room.getId(),
        room.getName(),
        room.getType(),
        room.getPrice().doubleValue(),
        room.getDescription(),
        null,
        1,
        room.getImageBase64Strings().stream()
            .map(ImageDTO::new)
            .sorted(Comparator.comparingInt(a -> a.imageNumber().intValue()))
            .toList());
  }
}
