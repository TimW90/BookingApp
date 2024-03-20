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

    @Column(nullable = false)
    private String name;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Type type;

    @Column(nullable = false)
    private BigDecimal price;

    private String description;

    @Lob
    @OneToMany(mappedBy = "room", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private Set<Image> imageBase64Strings = new HashSet<>();

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
