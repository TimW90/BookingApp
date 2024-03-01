package nl.itvitae.BookingApp.daterange;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@CrossOrigin("http://localhost:5173")
@RequestMapping("api/v1/hotels")
public class DateRangeController {
    @Autowired
    DateRangeRepository dateRangeRepository;

    @PostMapping("/makeRange")
    public DateRange makeRange(@RequestBody DateRange dateRange) {
        return dateRangeRepository.save(dateRange);
    }

    @GetMapping("/findall")
    public Iterable<DateRange> getDateRange() {
        return dateRangeRepository.findAll();
    }
}
