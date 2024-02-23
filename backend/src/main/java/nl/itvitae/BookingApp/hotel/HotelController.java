package nl.itvitae.BookingApp.hotel;

import lombok.RequiredArgsConstructor;
import nl.itvitae.BookingApp.exception.LocationNotFoundException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.sql.rowset.serial.SerialBlob;
import java.io.IOException;
import java.sql.Blob;
import java.sql.SQLException;

@RestController
@CrossOrigin("http://localhost:5173")
@RequestMapping("api/v1/hotels")
@RequiredArgsConstructor
public class HotelController {

    private final HotelRepository hotelRepository;

    @GetMapping
    public Iterable<Hotel> findAll() {
        return hotelRepository.findAll();
    }

    @GetMapping("get")
    public Hotel getByQuery(@RequestParam(required = false) Location location) {
    return hotelRepository
        .findByLocation(location)
        .orElseThrow(() -> new LocationNotFoundException(location.name()));
    }

    @PostMapping
    public Hotel newHotel(
            @RequestParam("name") String name,
            @RequestParam("rating") int rating,
            @RequestParam("location") Location location,
            @RequestParam("image") MultipartFile image
            ) throws IOException, SQLException {

            Hotel newHotel = new Hotel();
            newHotel.setName(name);
            newHotel.setRating(rating);
            newHotel.setLocation(location);

            if (!image.isEmpty()) {
                byte[] imageBytes = image.getBytes();
                newHotel.setImage(imageBytes);
            }

        return hotelRepository.save(newHotel);
    }
}
