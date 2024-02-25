package nl.itvitae.BookingApp.hotel;

import jakarta.persistence.*;
import java.sql.Blob;
import java.sql.SQLException;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.apache.tomcat.util.codec.binary.Base64;

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

  @Lob private Blob image;

  public Hotel(String name, int rating, Location location, String description) {
    this.name = name;
    this.rating = rating;
    this.location = location;
    this.description = description;
  }

  public Hotel(String name, int rating, Location location, String description, Blob image) {
    this.name = name;
    this.rating = rating;
    this.location = location;
    this.description = description;
    this.image = image;
  }

  public String getImageAsBase64String() {
    try {
      if (image != null) return Base64.encodeBase64String(image.getBytes(1, (int) image.length()));
    } catch (SQLException e) {
      System.out.println(e.getMessage());
    }
    return null;
  }
}
