package nl.itvitae.BookingApp.room;

import nl.itvitae.BookingApp.image.ImageDTO;

import java.math.BigDecimal;
import java.util.List;


public record RoomDTO(Long id, String name, String type, BigDecimal price, String description, List<ImageDTO> base64Images) {

    public RoomDTO(Room room) {
        this(
                room.getId(),
                room.getName(),
                room.getType(),
                room.getPrice(),
                room.getDescription(),
                room.getImageBase64Strings().stream().map(ImageDTO::new).toList());
    }
}