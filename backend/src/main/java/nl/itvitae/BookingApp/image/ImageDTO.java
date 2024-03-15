package nl.itvitae.BookingApp.image;

public record ImageDTO(Long id, Long roomId, String base64Image) {

  public ImageDTO(Image image) {
    this(image.getId(), image.getRoom().getId(), image.getBase64Image());
  }
}
