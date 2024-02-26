package nl.itvitae.BookingApp.hotel;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HotelRepository extends JpaRepository<Hotel, Long> {


  Optional<Hotel> findByLocation(Location location);

  Optional<Hotel> findByName(String name);
}
