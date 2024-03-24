package nl.itvitae.BookingApp.user;

import java.net.URI;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import nl.itvitae.BookingApp.exception.ResourceAlreadyExistsException;
import nl.itvitae.BookingApp.exception.UserNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

@RequiredArgsConstructor
@CrossOrigin("http://localhost:5173")
@RequestMapping("api/v1/users")
@RestController
public class UserController {

  private final UserRepository userRepository;
  private final PasswordEncoder passwordEncoder;

  @GetMapping()
  public Iterable<UserDTO> getAllUsers() {
    return userRepository.findAll().stream().map(UserDTO::new).toList();
  }

  @GetMapping("/{email}")
  public User findByEmail(@PathVariable("email") String email) {
    return userRepository.findByUsername(email).orElseThrow(() -> new UserNotFoundException(email));
  }

  @PostMapping()
  public ResponseEntity<UserDTO> saveUser(@RequestBody User user, UriComponentsBuilder ucb) {
    Optional<User> fetchedUser = userRepository.findByUsername(user.getUsername());
    if (fetchedUser.isPresent()) {
      throw new ResourceAlreadyExistsException(user.getUsername());
    }
    user.setPassword(passwordEncoder.encode(user.getPassword()));
    user.setRoles("USER");
    User savedUser = userRepository.save(user);

    URI locationOfNewUser = ucb.path("api/v1/users/{id}").buildAndExpand(savedUser.getId()).toUri();

    return ResponseEntity.created(locationOfNewUser).body(new UserDTO(savedUser));
  }

  @DeleteMapping("{id}")
  public ResponseEntity<?> deleteUser(@PathVariable long id) {
    if (userRepository.existsById(id)) {
      userRepository.deleteById(id);
      return ResponseEntity.noContent().build();
    }

    return ResponseEntity.notFound().build();
  }
}
