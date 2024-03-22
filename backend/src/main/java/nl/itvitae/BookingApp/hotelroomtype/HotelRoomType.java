package nl.itvitae.BookingApp.hotelroomtype;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nl.itvitae.BookingApp.hotel.Hotel;
import nl.itvitae.BookingApp.image.Image;
import nl.itvitae.BookingApp.image.ImageDTO;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

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
  private Type type;

  @Lob
  @OneToMany(mappedBy = "hotelRoomType", fetch = FetchType.EAGER)
  private Set<Image> imageBase64Strings = new HashSet<>();

  public HotelRoomType(Hotel hotel, Type type) {
    this.hotel = hotel;
    this.type = type;
  }

  public enum Type {
    SINGLE_ROOM,
    DOUBLE_ROOM,
    TRIPLE_ROOM,
    QUADRUPLE_ROOM
  }
}
