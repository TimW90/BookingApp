package nl.itvitae.BookingApp.image;

public record ImageDTO(String base64Image) {

    public ImageDTO(Image image) {
        this(image.getBase64Image());
    }

}
