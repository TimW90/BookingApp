package nl.itvitae.BookingApp.image;

import nl.itvitae.BookingApp.util.ImageUtil;

public record ImageDTO(Long imageNumber, String base64Image) {

  public ImageDTO(Image image) {
    this(image.getId(), ImageUtil.convertImagePathToBase64String(image.getPath()));
  }
}
