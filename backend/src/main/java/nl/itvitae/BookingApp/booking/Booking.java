package nl.itvitae.BookingApp.booking;

import jakarta.persistence.*;
import java.time.LocalDate;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nl.itvitae.BookingApp.room.Room;
import nl.itvitae.BookingApp.user.User;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Booking {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @Column(nullable = false)
  private LocalDate checkInDate;

  @Column(nullable = false)
  private LocalDate checkOutDate;

  @ManyToOne
  @JoinColumn(name = "user_id")
  private User user;

  @ManyToOne
  @JoinColumn(name = "room_id")
  private Room room;

  public Booking(LocalDate checkInDate, LocalDate checkOutDate, User user, Room room) {
    this.checkInDate = checkInDate;
    this.checkOutDate = checkOutDate;
    this.user = user;
    this.room = room;
  }
}
