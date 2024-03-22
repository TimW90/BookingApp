package nl.itvitae.BookingApp.booking;

import jakarta.transaction.Transactional;
import java.net.URI;
import java.time.LocalDate;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import nl.itvitae.BookingApp.exception.ResourceNotFoundException;
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

  @GetMapping("users/{username}")
  public Set<BookingDTO> getBookingsByUsername(@PathVariable String username) {
    User user =
        userRepository
            .findByEmail(username)
            .orElseThrow(
                () ->
                    new UsernameNotFoundException(
                        String.format("User with username %s not found", username)));

    return user.getBookings().stream()
        .map(BookingDTO::createBookingDTO)
        .collect(Collectors.toSet());
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
    User user =
        userRepository
            .findByEmail(bookingRequest.email())
            .orElseThrow(
                () ->
                    new UsernameNotFoundException(
                        String.format("User with username %s not found.", bookingRequest.email())));
    Room room =
        roomRepository
            .findById(bookingRequest.roomId())
            .orElseThrow(() -> new ResourceNotFoundException("Room for booking not found"));

    Booking newBooking =
        bookingRepository.save(
            new Booking(bookingRequest.checkIn(), bookingRequest.checkOut(), user, room));

    URI locationOfNewBooking =
        ucb.path("api/v1/bookings/{id}").buildAndExpand(newBooking.getId()).toUri();

    return ResponseEntity.created(locationOfNewBooking)
        .body(BookingDTO.createBookingDTO(newBooking));
  }

  public record BookingRequest(Long roomId, String email, LocalDate checkIn, LocalDate checkOut) {}
}
