package nl.itvitae.BookingApp.user;

import jakarta.persistence.*;
import java.util.HashSet;
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
  Set<Booking> bookings = new HashSet<>();

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String fullName;
  private String email;
  private String password;
  private String roles;

  public User(String fullName, String password, String email, String roles) {
    this.fullName = fullName;
    this.password = password;
    this.email = email;
    this.roles = roles;
  }

  public void addBooking(Booking booking) {
    bookings.add(booking);
    booking.setUser(this);
  }
}
