package nl.itvitae.BookingApp.booking;

import jakarta.transaction.Transactional;
import java.net.URI;
import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import nl.itvitae.BookingApp.exception.ResourceNotFoundException;
import nl.itvitae.BookingApp.hotelroomtype.HotelRoomType;
import nl.itvitae.BookingApp.hotelroomtype.HotelRoomTypeRepository;
import nl.itvitae.BookingApp.room.Room;
import nl.itvitae.BookingApp.room.RoomRepository;
import nl.itvitae.BookingApp.user.User;
import nl.itvitae.BookingApp.user.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

@Transactional
@RestController
@CrossOrigin("http://localhost:5173")
@RequestMapping("api/v1/bookings")
@RequiredArgsConstructor
public class BookingController {

  private final UserRepository userRepository;
  private final BookingRepository bookingRepository;
  private final RoomRepository roomRepository;
  private final HotelRoomTypeRepository hotelRoomTypeRepository;

  @GetMapping("users/{username}")
  public List<BookingDTO> getBookingsByUsername(@PathVariable String username) {
    User user =
        userRepository
            .findByUsername(username)
            .orElseThrow(
                () ->
                    new UsernameNotFoundException(
                        String.format("User with username %s not found", username)));

    return user.getBookings().stream().map(BookingDTO::createBookingDTO).sorted(Comparator.comparing(BookingDTO::checkInDate).reversed()).toList();
  }

  @GetMapping("{bookingId}")
  public BookingDTO getById(@PathVariable long bookingId) {
    return bookingRepository
        .findById(bookingId)
        .map(BookingDTO::createBookingDTO)
        .orElseThrow(
            () ->
                new ResourceNotFoundException(
                    String.format("Booking with id %d not found", bookingId)));
  }

  @PostMapping()
  public ResponseEntity<?> addBooking(
      @RequestBody BookingRequest bookingRequest, UriComponentsBuilder ucb) {
    HotelRoomType hotelRoomType = hotelRoomTypeRepository.findById(bookingRequest.hotelRoomTypeId).orElseThrow(() -> new ResourceNotFoundException(String.format("HotelRoomType with id %d not found", bookingRequest.hotelRoomTypeId())));

    User user =
        userRepository
            .findByUsername(bookingRequest.userEmail())
            .orElseThrow(
                () ->
                    new UsernameNotFoundException(
                        String.format(
                            "User with username %s not found.", bookingRequest.userEmail())));
    Room room = hotelRoomTypeRepository.findAvailableRoomsForHotelRoomType(hotelRoomType, bookingRequest.checkInDate, bookingRequest.checkOutDate).getFirst();
    Booking newBooking =
        bookingRepository.save(
            new Booking(bookingRequest.checkInDate(), bookingRequest.checkOutDate(), user, room));

    URI locationOfNewBooking =
        ucb.path("api/v1/bookings/{id}").buildAndExpand(newBooking.getId()).toUri();

    return ResponseEntity.created(locationOfNewBooking)
        .body(BookingDTO.createBookingDTO(newBooking));
  }

  @DeleteMapping("{bookingId}")
  public ResponseEntity<?> cancelBooking(@PathVariable Long bookingId) {
    Booking bookingToDelete =
        bookingRepository
            .findById(bookingId)
            .orElseThrow(
                () ->
                    new ResourceNotFoundException(
                        String.format("Booking with id %d not found", bookingId)));

    bookingRepository.deleteById(bookingId);
    return ResponseEntity.noContent().build();
  }

  public record BookingRequest(
      Long hotelRoomTypeId, String userEmail, LocalDate checkInDate, LocalDate checkOutDate) {}
}
