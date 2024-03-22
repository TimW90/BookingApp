package nl.itvitae.BookingApp.booking;

import java.math.BigDecimal;
import java.time.LocalDate;

public record BookingDTO(
    Long id,
    Long userId,
    String hotelName,
    String roomName,
    BigDecimal price,
    LocalDate checkIn,
    LocalDate checkOut) {

  public static BookingDTO createBookingDTO(Booking booking) {
    return new BookingDTO(
        booking.getId(),
        booking.getUser().getId(),
        booking.getRoom().getHotel().getName(),
        booking.getRoom().getName(),
        booking.getRoom().getPrice(),
        booking.getCheckIn(),
        booking.getCheckOut());
  }
}
