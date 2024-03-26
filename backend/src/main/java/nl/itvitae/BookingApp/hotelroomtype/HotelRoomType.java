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
import nl.itvitae.BookingApp.hotel.HotelRepository;
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

  @Column(nullable = false)
  private String name;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private RoomType type;

  @Column(nullable = false)
  private BigDecimal price;

  private String description;

  @OneToMany(mappedBy = "hotelRoomType")
  private Set<Room> rooms = new HashSet<>();

  @OneToMany(mappedBy = "hotelRoomType", fetch = FetchType.EAGER)
  private List<Image> imagePaths = new ArrayList<>();

  public HotelRoomType(Hotel hotel, RoomType type, String name, double price, String description) {
    this.hotel = hotel;
    this.name = name;
    this.type = type;
    this.price = BigDecimal.valueOf(price);
    this.description = description;
  }

  public void updateHotelRoomTypeProperties(
      HotelRepository hotelRepository, HotelRoomTypeDTO hotelRoomTypeDTO) {
    this.hotel =
        hotelRepository
            .findById(hotelRoomTypeDTO.hotelId())
            .orElseThrow(
                () ->
                    new EntityNotFoundException(
                        "Hotel not found with ID: " + hotelRoomTypeDTO.hotelId()));
    this.name = hotelRoomTypeDTO.name();
    this.type = hotelRoomTypeDTO.type();
    this.price = BigDecimal.valueOf(hotelRoomTypeDTO.price());
    this.description = hotelRoomTypeDTO.description();
  }
}
