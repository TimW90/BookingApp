package nl.itvitae.BookingApp.room;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nl.itvitae.BookingApp.image.Image;

import java.math.BigDecimal;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

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

    private String description;

    @OneToMany(mappedBy = "room", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Set<Image> imageBase64Strings = new HashSet<>();

    public Room(Type type, double price, boolean luxury, String description) {
        this.type = type;
        this.price = BigDecimal.valueOf(price);
        this.luxury = luxury;
        this.description = description;
    }
    public enum Type {
        SINGLE,
        DOUBLE,
        TRIPPLE,
        QUADRUPPLE
    }
}
