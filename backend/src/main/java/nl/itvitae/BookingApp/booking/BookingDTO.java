package nl.itvitae.BookingApp.booking;

import java.time.LocalDate;
import nl.itvitae.BookingApp.room.RoomDTO;
import nl.itvitae.BookingApp.user.UserDTO;

public record BookingDTO(
    Long id, String hotelName, UserDTO user, RoomDTO room, LocalDate checkIn, LocalDate checkOut) {

  public static BookingDTO createBookingDTO(Booking booking) {
    return new BookingDTO(
        booking.getId(),
        booking.getRoom().getHotel().getName(),
        new UserDTO(booking.getUser()),
        new RoomDTO(booking.getRoom()),
        booking.getCheckIn(),
        booking.getCheckOut());
  }
}
