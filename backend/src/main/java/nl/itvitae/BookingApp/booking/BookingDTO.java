package nl.itvitae.BookingApp.booking;

import java.math.BigDecimal;
import java.time.LocalDate;

public record BookingDTO(
    Long id,
    Long userId,
    String hotelName,
    String roomName,
    BigDecimal price,
    LocalDate checkInDate,
    LocalDate checkOutDate) {

  public static BookingDTO createBookingDTO(Booking booking) {
    return new BookingDTO(
        booking.getId(),
        booking.getUser().getId(),
        booking.getRoom().getHotelRoomType().getHotel().getName(),
        booking.getRoom().getHotelRoomType().getName(),
        booking.getRoom().getHotelRoomType().getPrice(),
        booking.getCheckInDate(),
        booking.getCheckOutDate());
  }
}
