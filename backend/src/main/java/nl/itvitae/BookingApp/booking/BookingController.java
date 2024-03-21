package nl.itvitae.BookingApp.booking;

import jakarta.transaction.Transactional;
import java.util.Set;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import nl.itvitae.BookingApp.user.User;
import nl.itvitae.BookingApp.user.UserRepository;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:5173")
@RequestMapping("api/v1/bookings")
@RequiredArgsConstructor
public class BookingController {

  private final UserRepository userRepository;

  @Transactional
  @GetMapping("{username}")
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
}
