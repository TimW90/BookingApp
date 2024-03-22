package nl.itvitae.BookingApp.hotelroomtype;

import nl.itvitae.BookingApp.image.Image;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface HotelRoomTypeRepository extends JpaRepository<HotelRoomType, Long> {}
