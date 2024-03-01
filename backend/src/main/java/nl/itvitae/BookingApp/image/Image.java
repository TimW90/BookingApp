package nl.itvitae.BookingApp.image;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import nl.itvitae.BookingApp.room.Room;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne()
    @JoinColumn(name = "room_id")
    private Room room;

    @Lob
    private String base64Image;

    public Image(String base64Image) {
        this.base64Image = base64Image;
    }
}
