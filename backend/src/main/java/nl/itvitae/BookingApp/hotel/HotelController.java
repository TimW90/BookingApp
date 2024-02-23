package nl.itvitae.BookingApp.hotel;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

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

    @GetMapping
    public Optional<Hotel> getByRandomId() {
        long count = hotelRepository.count();
        int maxQuantity = (int)count;
        int randomID = (int) (Math.random() * count);
        return hotelRepository.findByRandomId();
    }
}
