package nl.itvitae.BookingApp.user;

public record UserDTO(Long id, String firstName, String username) {
  public UserDTO(User user) {
    this(user.getId(), user.getFullName(), user.getEmail());
  }
}
