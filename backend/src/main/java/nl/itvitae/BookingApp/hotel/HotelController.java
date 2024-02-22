package nl.itvitae.BookingApp.hotel;

import lombok.RequiredArgsConstructor;
import nl.itvitae.BookingApp.exception.LocationNotFoundException;
import org.springframework.web.bind.annotation.*;

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
    public Hotel newHotel(@RequestBody Hotel hotel) {
        return hotelRepository.save(hotel);
    }
}
