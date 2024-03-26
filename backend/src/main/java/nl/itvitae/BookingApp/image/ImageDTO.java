package nl.itvitae.BookingApp.image;

import nl.itvitae.BookingApp.hotelroomtype.HotelRoomType;
import nl.itvitae.BookingApp.util.ImageUtil;

public record ImageDTO(Long imageId, int imageOrder, String base64Image, Long hotelRoomTypeId) {

  public ImageDTO(Image image) {
    this(
        image.getId(),
        image.getImageOrder(),
        ImageUtil.convertImagePathToBase64String(image.getPath()),
        image.getHotelRoomType().getId());
  }
}
