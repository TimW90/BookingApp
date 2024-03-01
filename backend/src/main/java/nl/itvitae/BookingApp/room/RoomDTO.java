package nl.itvitae.BookingApp.room;

import nl.itvitae.BookingApp.image.Image;
import nl.itvitae.BookingApp.image.ImageDTO;

import java.math.BigDecimal;
import java.util.List;
import java.util.Set;

import static nl.itvitae.BookingApp.util.EnumUtil.enumName;

public record RoomDTO(Long id, String type, BigDecimal price, boolean luxury, String description, List<ImageDTO> base64Image) {

    public RoomDTO(Room room) {
        this(
                room.getId(),
                enumName(room.getType().name()),
                room.getPrice(),
                room.isLuxury(),
                room.getDescription(),
                room.getImageBase64Strings().stream().map(ImageDTO::new).toList());
    }
}