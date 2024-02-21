package nl.itvitae.BookingApp.hotel;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Hotel {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private int rating;

    @Enumerated(EnumType.STRING)
    private Location location;

    public Hotel(String name, int rating, Location location) {
        this.name = name;
        this.rating = rating;
        this.location = location;
    }
}
