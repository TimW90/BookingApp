package nl.itvitae.BookingApp.room;


public record RoomDTO(Long id, HotelRoomType hotelRoomType, int quantity) {

  public RoomDTO(Room room) {
    this(room.getId(), room.getHotelRoomType(), 1);
  }
}
