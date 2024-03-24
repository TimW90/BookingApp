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

  private String path;

  public Image(String path) {
    this.path = path;
  }

  public Image(ImageDTO imageDTO) {
    this(imageDTO.base64Image());
  }
}
