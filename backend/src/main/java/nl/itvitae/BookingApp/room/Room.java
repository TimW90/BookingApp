package nl.itvitae.BookingApp.room;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.util.HashSet;
import java.util.Set;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
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

  @Column(nullable = false)
  private String name;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private Type type;

  @Column(nullable = false)
  private BigDecimal price;

  private String description;

  @OneToMany(mappedBy = "room", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
  private Set<Image> imageBase64Strings = new HashSet<>();

  @ManyToOne
  @JoinColumn(name = "hotel_id")
  private Hotel hotel;

  private boolean isDeleted = Boolean.FALSE;

  public Room(String name, Type type, double price, String description) {
    this.name = name;
    this.type = type;
    this.price = BigDecimal.valueOf(price);
    this.description = description;
  }

  public enum Type {
    SINGLE_ROOM,
    DOUBLE_ROOM,
    TRIPLE_ROOM,
    QUADRUPLE_ROOM
  }
}
