package nl.itvitae.BookingApp.exception;

import java.util.NoSuchElementException;

public class LocationNotFoundException extends NoSuchElementException {
    public LocationNotFoundException(String location) {
        super(String.format("Location %s not found", location));
    }
}
