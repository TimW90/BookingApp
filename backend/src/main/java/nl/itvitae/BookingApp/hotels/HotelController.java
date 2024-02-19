package nl.itvitae.BookingApp.hotels;

import lombok.RequiredArgsConstructor;
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

    @PostMapping
    public Hotel newHotel(@RequestBody Hotel hotel) {
        return hotelRepository.save(hotel);
    }
}
