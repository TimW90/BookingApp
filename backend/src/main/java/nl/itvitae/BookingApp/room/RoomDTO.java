package nl.itvitae.BookingApp.room;

import nl.itvitae.BookingApp.hotelroomtype.HotelRoomType;

public record RoomDTO(Long id, HotelRoomType hotelRoomType, int quantity) {

  public RoomDTO(Room room) {
    this(room.getId(), room.getHotelRoomType(), 1);
  }
}
