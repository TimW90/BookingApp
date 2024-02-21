package nl.itvitae.BookingApp.seeder;


import lombok.RequiredArgsConstructor;
import nl.itvitae.BookingApp.hotel.Hotel;
import nl.itvitae.BookingApp.hotel.HotelRepository;
import nl.itvitae.BookingApp.hotel.Location;
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
    hotelRepository.saveAll(
        List.of(new Hotel("Hotel", 3, Location.AMSTERDAM), new Hotel("Motel", 1, Location.ROTTERDAM)));
    }
}
