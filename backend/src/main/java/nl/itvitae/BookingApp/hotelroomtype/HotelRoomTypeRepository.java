package nl.itvitae.BookingApp.hotelroomtype;

import java.time.LocalDate;
import java.util.List;
import nl.itvitae.BookingApp.hotel.Hotel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface HotelRoomTypeRepository extends JpaRepository<HotelRoomType, Long> {
  List<HotelRoomType> findByHotel(Hotel hotel);

  @Query(
      "SELECT COUNT(r) FROM Room r WHERE r.hotelRoomType = :hotelRoomType AND r NOT IN ("
          + "SELECT b.room FROM Booking b WHERE b.room.hotelRoomType = :hotelRoomType AND "
          + "((b.checkInDate <= :checkOutDate AND b.checkOutDate >= :checkInDate)))")
  Long countAvailableRoomsForHotelRoomType(
      @Param("hotelRoomType") HotelRoomType hotelRoomType,
      @Param("checkInDate") LocalDate checkInDate,
      @Param("checkOutDate") LocalDate checkOutDate);

  List<HotelRoomType> findByHotelId(Long hotelId);
}
