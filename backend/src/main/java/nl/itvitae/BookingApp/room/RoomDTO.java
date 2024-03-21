package nl.itvitae.BookingApp.room;

import static nl.itvitae.BookingApp.util.EnumUtil.enumName;

import java.math.BigDecimal;
import java.util.Comparator;
import java.util.List;
import nl.itvitae.BookingApp.image.ImageDTO;

public record RoomDTO(
    Long id,
    String name,
    String type,
    BigDecimal price,
    String description,
    List<ImageDTO> base64Images) {

  public RoomDTO(Room room) {
    this(
        room.getId(),
        room.getName(),
        enumName(room.getType().name()),
        room.getPrice(),
        room.getDescription(),
        room.getImageBase64Strings().stream()
            .map(ImageDTO::new)
            .sorted(Comparator.comparingInt(a -> a.id().intValue()))
            .toList());
  }
}
