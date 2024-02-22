package nl.itvitae.BookingApp.room;

import java.math.BigDecimal;
import java.util.Set;

public record RoomDTO(Long id, Room.Type type, BigDecimal price, Set<Room.Amenity> amenities, boolean luxury) {

    public RoomDTO(Room room) {
        this(
                room.getId(),
                room.getType(),
                room.getPrice(),
                room.getAmenities(),
                room.isLuxury());
    }
}