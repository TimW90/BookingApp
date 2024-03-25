package nl.itvitae.BookingApp.room;

import java.time.LocalDate;
import java.util.List;
import nl.itvitae.BookingApp.hotelroomtype.HotelRoomType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
  @Query(
      "SELECT r FROM Room r WHERE r.hotelRoomType = :hotelRoomType AND r.id NOT IN ("
          + "SELECT b.room.id FROM Booking b WHERE b.checkInDate < :checkOutDate AND b.checkOutDate > :checkInDate)")
  List<Room> findAvailableRoomsByHotelRoomTypeAndDateRange(
      @Param("hotelRoomType") HotelRoomType hotelRoomType,
      @Param("checkInDate") LocalDate checkInDate,
      @Param("checkOutDate") LocalDate checkOutDate);
}
