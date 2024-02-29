package nl.itvitae.BookingApp.hotel;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Hotel {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  private String name;
  private int rating;

  @Enumerated(EnumType.STRING)
  private Location location;

  @Column(length = 1000)
  private String description;

  @Lob private String base64Image;

  public Hotel(String name, int rating, Location location, String description, String base64Image) {
    this.name = name;
    this.rating = rating;
    this.location = location;
    this.description = description;
    this.base64Image = base64Image;
  }

  public void updateHotelProperties(HotelDTO hotelDTO) {
    this.name = hotelDTO.name();
    this.rating = hotelDTO.rating();
    this.location = hotelDTO.location();
    this.description = hotelDTO.description();
    this.base64Image = hotelDTO.base64Image();
  }
}
