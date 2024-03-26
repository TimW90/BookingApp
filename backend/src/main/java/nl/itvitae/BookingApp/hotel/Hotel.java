package nl.itvitae.BookingApp.hotel;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nl.itvitae.BookingApp.hotelroomtype.HotelRoomType;
import nl.itvitae.BookingApp.util.ImageUtil;
import org.hibernate.annotations.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@SQLDelete(sql = "UPDATE hotel SET deleted = true WHERE id=?")
@FilterDef(
    name = "deletedHotelFilter",
    parameters = @ParamDef(name = "isDeleted", type = Boolean.class))
@Filter(name = "deletedHotelFilter", condition = "deleted = :isDeleted")
public class Hotel {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  private String name;
  private int starRating;

  @Enumerated(EnumType.STRING)
  private Location location;

  @Column(length = 1500)
  private String description;

  private String imagePath;

  @OneToMany(mappedBy = "hotel")
  private List<HotelRoomType> hotelRoomTypes = new ArrayList<>();

  private boolean deleted = Boolean.FALSE;

  public Hotel(String name, int rating, Location location, String description, String imagePath) {
    this.name = name;
    this.starRating = rating;
    this.location = location;
    this.description = description;
    this.imagePath = imagePath;
  }

  public void updateHotelProperties(HotelDTO hotelDTO) {
    this.name = hotelDTO.name();
    this.starRating = Integer.parseInt(hotelDTO.starRating());
    this.location = hotelDTO.location();
    this.description = hotelDTO.description();
    this.imagePath = ImageUtil.saveBase64Image(hotelDTO.base64Image(), hotelDTO.name());
  }
}
