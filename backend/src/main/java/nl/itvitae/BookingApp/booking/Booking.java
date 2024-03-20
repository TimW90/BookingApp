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

  private LocalDate checkIn;
  private LocalDate checkOut;

  @ManyToOne
  @JoinColumn(name = "user_id")
  private User user;

  @ManyToOne
  @JoinColumn(name = "room_id")
  private Room room;

  public Booking(LocalDate checkIn, LocalDate checkOut) {
    this.checkIn = checkIn;
    this.checkOut = checkOut;
  }
}
