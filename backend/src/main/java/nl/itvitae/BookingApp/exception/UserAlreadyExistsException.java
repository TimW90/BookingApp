package nl.itvitae.BookingApp.exception;

public class UserAlreadyExistsException extends IllegalArgumentException {
  public UserAlreadyExistsException(String message) {
    super(message);
  }
}
