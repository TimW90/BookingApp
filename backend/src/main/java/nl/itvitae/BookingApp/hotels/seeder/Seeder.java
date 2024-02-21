package nl.itvitae.BookingApp.hotels.seeder;


import lombok.RequiredArgsConstructor;
import nl.itvitae.BookingApp.hotels.Hotel;
import nl.itvitae.BookingApp.hotels.HotelRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@RequiredArgsConstructor
@Component
public class Seeder implements CommandLineRunner {

    private final HotelRepository hotelRepository;

    @Override
    public void run(String... args) throws Exception {
        seedHotels();
    }

    public void seedHotels() {
        hotelRepository.saveAll(List.of(new Hotel("Hotel", 3), new Hotel("Motel", 1)));
    }
}
