package nl.itvitae.BookingApp.image;

public record ImageDTO(Long imageId, Integer imageOrder, String base64Image, Long hotelRoomTypeId) {

  public ImageDTO(Image image) {
    this(
        image.getId(),
        image.getImageOrder(),
        image.getBase64Image(),
        image.getHotelRoomType().getId());
  }
}
