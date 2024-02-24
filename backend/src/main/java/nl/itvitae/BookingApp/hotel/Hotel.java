package nl.itvitae.BookingApp.hotel;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Blob;
import java.sql.Clob;

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

    @Column(length = 1000)
    private String description;

    @Lob
    private Blob image;

    public Hotel(String name, int rating, Location location, String description) {
        this.name = name;
        this.rating = rating;
        this.location = location;
        this.description = description;
    }
}
