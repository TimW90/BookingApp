package nl.itvitae.BookingApp.room;

import jakarta.persistence.*;
import java.math.BigDecimal;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Room {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @Enumerated(EnumType.STRING)
  @Column(nullable = false)
  private Type type;

  @Column(nullable = false)
  private BigDecimal price;

  @Column(nullable = false)
  private boolean luxury;

  public Room(Type type, double price, boolean luxury) {
    this.type = type;
    this.price = BigDecimal.valueOf(price);
    this.luxury = luxury;
  }

  public enum Type {
    SINGLE,
    DOUBLE,
    TRIPPLE,
    QUADRUPPLE
  }
}
