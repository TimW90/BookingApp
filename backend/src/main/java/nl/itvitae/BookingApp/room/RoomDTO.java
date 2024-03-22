package nl.itvitae.BookingApp.room;

import nl.itvitae.BookingApp.hotelroomtype.HotelRoomType;

public record RoomDTO(
    Long id,
    String name,
    HotelRoomType hotelRoomType,
    double price,
    String description,
    int quantity) {

  public RoomDTO(Room room) {
    this(
        room.getId(),
        room.getName(),
        room.getHotelRoomType(),
        room.getPrice().doubleValue(),
        room.getDescription(),
        1);
  }
}
