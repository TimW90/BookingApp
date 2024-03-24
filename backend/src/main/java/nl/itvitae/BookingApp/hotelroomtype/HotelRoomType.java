package nl.itvitae.BookingApp.hotelroomtype;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nl.itvitae.BookingApp.hotel.Hotel;
import nl.itvitae.BookingApp.image.Image;
import nl.itvitae.BookingApp.room.Room;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class HotelRoomType {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @ManyToOne private Hotel hotel;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private RoomType type;

  @Column(nullable = false)
  private String name;

  @Column(nullable = false)
  private BigDecimal price;

  private String description;

  @OneToMany(mappedBy = "hotelRoomType")
  private Set<Room> rooms = new HashSet<>();

  @OneToMany(mappedBy = "hotelRoomType", fetch = FetchType.EAGER)
  private List<Image> imagePaths = new ArrayList<>();

  public HotelRoomType(RoomType type, String name, double price, String description) {
    this.type = type;
    this.name = name;
    this.price = BigDecimal.valueOf(price);
    this.description = description;
  }
}
