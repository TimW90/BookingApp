package nl.itvitae.BookingApp.room;

import java.math.BigDecimal;
import java.util.List;
import java.util.Set;

import static nl.itvitae.BookingApp.util.EnumUtil.enumName;

public record RoomDTO(Long id, String type, BigDecimal price, String[] amenities, boolean luxury) {

    public RoomDTO(Room room) {
        this(
                room.getId(),
                enumName(room.getType().name()),
                room.getPrice(),
                room.getAmenities().stream()
                        .map((amenity) -> enumName(amenity.name()))
                        .toArray(String[]::new),
                room.isLuxury());
    }
}