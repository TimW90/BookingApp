package nl.itvitae.BookingApp.user;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor()
@Entity()
public class User {

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
}
