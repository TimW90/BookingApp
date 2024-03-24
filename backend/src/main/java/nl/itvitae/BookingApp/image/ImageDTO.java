package nl.itvitae.BookingApp.image;

public record ImageDTO(Long imageNumber, String base64Image) {

  public ImageDTO(Image image) {
    this(image.getId(), image.getBase64Image());
  }
}
