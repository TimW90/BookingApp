package nl.itvitae.BookingApp.hotelroomtype;

import java.util.List;
import nl.itvitae.BookingApp.hotel.Hotel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HotelRoomTypeRepository extends JpaRepository<HotelRoomType, Long> {
  List<HotelRoomType> findByHotel(Hotel hotel);
}
