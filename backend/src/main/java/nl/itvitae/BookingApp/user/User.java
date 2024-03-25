package nl.itvitae.BookingApp.user;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nl.itvitae.BookingApp.booking.Booking;

@Getter
@Setter
@NoArgsConstructor()
@Entity()
public class User {

  @OneToMany(mappedBy = "user")
  List<Booking> bookings = new ArrayList<>();

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String fullName;
  private String username;
  private String password;
  private String roles;

  public User(String fullName, String password, String username, String roles) {
    this.fullName = fullName;
    this.password = password;
    this.username = username;
    this.roles = roles;
  }

  public void addBooking(Booking booking) {
    bookings.add(booking);
    booking.setUser(this);
  }
}
