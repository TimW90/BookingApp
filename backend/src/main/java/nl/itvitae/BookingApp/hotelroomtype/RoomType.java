package nl.itvitae.BookingApp.hotelroomtype;

import lombok.Getter;

@Getter
public enum RoomType {
  SINGLE_ROOM(1),
  DOUBLE_ROOM(2),
  TRIPLE_ROOM(3),
  QUADRUPLE_ROOM(4);

  private final int capacity;

  RoomType(int capacity) {
    this.capacity = capacity;
  }

}
