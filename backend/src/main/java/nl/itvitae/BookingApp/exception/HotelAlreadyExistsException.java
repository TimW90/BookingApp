package nl.itvitae.BookingApp.exception;

import java.util.NoSuchElementException;

public class HotelAlreadyExistsException extends NoSuchElementException {
    public HotelAlreadyExistsException(String hotel) {
        super(String.format("Hotel %s already exists", hotel));
    }
}
