package nl.itvitae.BookingApp.image;

import nl.itvitae.BookingApp.util.ImageUtil;

public record ImageDTO(Long imageId, int imageOrder, String base64Image) {

  public ImageDTO(Image image) {
    this(
        image.getId(),
        image.getImageOrder(),
        ImageUtil.convertImagePathToBase64String(image.getPath()));
  }
}
