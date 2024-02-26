package nl.itvitae.BookingApp.hotel;

public record HotelDTO(Long id, String name, int rating, Location location, String description, String base64Image) {
    public HotelDTO(Hotel hotel) {
        this(
                hotel.getId(),
                hotel.getName(),
                hotel.getRating(),
                hotel.getLocation(),
                hotel.getDescription(),
                hotel.getImageAsBase64String()
                );
    }
}
