package nl.itvitae.BookingApp.room;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nl.itvitae.BookingApp.hotelroomtype.HotelRoomType;
import nl.itvitae.BookingApp.image.Image;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Room {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @Column(nullable = false)
  private String name;

  @ManyToOne private HotelRoomType hotelRoomType;

  @Column(nullable = false)
  private BigDecimal price;

  private String description;

  public Room(String name, HotelRoomType hotelRoomType, double price, String description) {
    this.name = name;
    this.hotelRoomType = hotelRoomType;
    this.price = BigDecimal.valueOf(price);
    this.description = description;
  }
}
