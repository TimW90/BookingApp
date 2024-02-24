package nl.itvitae.BookingApp.hotel;

import java.sql.SQLException;

public record HotelDTO(Long id, String name, int rating, Location location, String description) {
    public HotelDTO(Hotel hotel) {
        this(
                hotel.getId(),
                hotel.getName(),
                hotel.getRating(),
                hotel.getLocation(),
                hotel.getDescription()
                );
    }
}
