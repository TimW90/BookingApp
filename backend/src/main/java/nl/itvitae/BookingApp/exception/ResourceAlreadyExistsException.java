package nl.itvitae.BookingApp.exception;

public class ResourceAlreadyExistsException extends IllegalArgumentException {
    public ResourceAlreadyExistsException(String subject) {
        super(String.format("%s already exists", subject));
    }
}