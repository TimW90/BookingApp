package nl.itvitae.BookingApp.exception;


public class UserNotFoundException extends ResourceNotFoundException {
  public UserNotFoundException(String identifierName) {
    super(String.format("User with email %s is not found", identifierName));
  }
}
