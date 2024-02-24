package nl.itvitae.BookingApp.hotel;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import nl.itvitae.BookingApp.exception.ResourceAlreadyExistsException;
import nl.itvitae.BookingApp.exception.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.util.Base64Utils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.util.UriComponentsBuilder;

import javax.sql.rowset.serial.SerialBlob;
import java.io.IOException;
import java.net.URI;
import java.sql.Blob;
import java.sql.SQLException;
import java.util.Base64;
import java.util.List;

@Transactional
@RestController
@CrossOrigin("http://localhost:5173")
@RequestMapping("api/v1/hotels")
@RequiredArgsConstructor
public class HotelController {

    private final HotelRepository hotelRepository;

    @GetMapping
    public List<HotelDTO> findAll() {
        return hotelRepository.findAll().stream().map(HotelDTO::new).toList();
    }

    @GetMapping("get")
    public Hotel getByQuery(@RequestParam(required = false) Location location) {
    return hotelRepository
        .findByLocation(location)
        .orElseThrow(() -> new ResourceNotFoundException(location.name()));
    }


    @GetMapping("/image/{hotelId}")
    public String getHotelImageById(@PathVariable long hotelId) throws SQLException {
        Hotel theHotel = hotelRepository.findById(hotelId).orElseThrow(() -> new ResourceNotFoundException("Hotel with id " + hotelId));
        Blob imageBlob = theHotel.getImage();
        if(imageBlob == null) throw new ResourceNotFoundException("Image for hotel with id " + hotelId);

        return Base64.getEncoder().encodeToString(imageBlob.getBytes(1, (int) imageBlob.length()));
    }

    @PostMapping
    public ResponseEntity<?> newHotel(
            @RequestParam("name") String name,
            @RequestParam("rating") int rating,
            @RequestParam("location") Location location,
            @RequestParam("image") MultipartFile image,
            @RequestParam("description") String description,
            UriComponentsBuilder ucb
            ) throws IOException, SQLException {

            if (hotelRepository.findByName(name).isPresent()) throw new ResourceAlreadyExistsException(name);

            Hotel newHotel = new Hotel();
            newHotel.setName(name);
            newHotel.setRating(rating);
            newHotel.setLocation(location);
            newHotel.setDescription(description);

            if (!image.isEmpty()) {
                byte[] imageBytes = image.getBytes();
                newHotel.setImage(new SerialBlob(imageBytes));
            }

        hotelRepository.save(newHotel);
        URI locationOfNewCart = ucb
                .path("api/v1/hotels/{id}")
                .buildAndExpand(newHotel.getId())
                .toUri();

        return ResponseEntity.created(locationOfNewCart).body(newHotel);
    }
}
