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

  @ManyToOne private HotelRoomType hotelRoomType;

  public Room(HotelRoomType hotelRoomType) {
    this.hotelRoomType = hotelRoomType;
  }
}
