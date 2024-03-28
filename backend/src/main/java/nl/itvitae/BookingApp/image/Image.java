package nl.itvitae.BookingApp.image;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nl.itvitae.BookingApp.hotelroomtype.HotelRoomType;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Image {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @ManyToOne() private HotelRoomType hotelRoomType;

  @Lob private String base64Image;

  private Integer imageOrder;

  public Image(String base64Image, int imageOrder) {
    this.base64Image = base64Image;
    this.imageOrder = imageOrder;
  }

  public Image(ImageDTO imageDTO) {
    this(imageDTO.base64Image(), imageDTO.imageOrder());
  }
}
