package nl.itvitae.BookingApp.hotel;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HotelRepository extends JpaRepository<Hotel, Long> {

<<<<<<< Updated upstream
  Optional<Hotel> findByLocation(Location location);
=======


>>>>>>> Stashed changes

  Optional<Hotel> findByName(String name);
}
