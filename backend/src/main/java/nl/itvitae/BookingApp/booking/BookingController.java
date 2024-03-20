package nl.itvitae.BookingApp.booking;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("http://localhost:5173")
@RequestMapping("api/v1/bookings")
@RequiredArgsConstructor

public class BookingController {

    private BookingRepository bookingRepository;
}
