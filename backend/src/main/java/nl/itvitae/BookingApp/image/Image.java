package nl.itvitae.BookingApp.image;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nl.itvitae.BookingApp.hotelroomtype.HotelRoomType;
import nl.itvitae.BookingApp.util.ImageUtil;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Image {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @ManyToOne() private HotelRoomType hotelRoomType;

  private String path;

  private int imageOrder;

  public Image(String path, int imageOrder) {
    this.path = path;
    this.imageOrder = imageOrder;
  }

  public Image(ImageDTO imageDTO) {
    this(
        ImageUtil.saveBase64Image(imageDTO.base64Image(), "new_image" + imageDTO.imageId()),
        imageDTO.imageOrder());
  }
}
