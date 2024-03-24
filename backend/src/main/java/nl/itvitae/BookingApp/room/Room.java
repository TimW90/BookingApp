package nl.itvitae.BookingApp.room;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nl.itvitae.BookingApp.hotelroomtype.HotelRoomType;
import nl.itvitae.BookingApp.hotel.Hotel;
import nl.itvitae.BookingApp.image.Image;
import org.hibernate.annotations.Filter;
import org.hibernate.annotations.FilterDef;
import org.hibernate.annotations.ParamDef;
import org.hibernate.annotations.SQLDelete;

@Entity
@Getter
@Setter
@NoArgsConstructor
@SQLDelete(sql = "UPDATE room SET deleted = true WHERE id=?")
@FilterDef(
    name = "deletedRoomFilter",
    parameters = @ParamDef(name = "isDeleted", type = Boolean.class))
@Filter(name = "deletedRoomFilter", condition = "isDeleted = :isDeleted")
public class Room {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @ManyToOne private HotelRoomType hotelRoomType;

  public Room(HotelRoomType hotelRoomType) {
    this.hotelRoomType = hotelRoomType;
  }
}
