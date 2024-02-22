package nl.itvitae.BookingApp.room;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

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
    private int price;

    @Enumerated(EnumType.STRING)
    private Set<Amenity> amenities;

    @Column(nullable = false)
    private boolean luxury;

    public Room(Type type, int price, Set<Amenity> amenities, boolean luxury) {
        this.type = type;
        this.price = price;
        this.amenities = amenities;
        this.luxury = luxury;
    }

    public enum Type {
        SINGLE,
        DOUBLE,
        TRIPPLE,
        QUADRUPPLE
    }

    public enum Amenity {
        SINGLE_BED,
        DOUBLE_BED,
        BREAKFAST,
        LUNCH,
        GYM,
        SWIMMING_POOL,
        AIRCO,
        WIFI
    }
}
