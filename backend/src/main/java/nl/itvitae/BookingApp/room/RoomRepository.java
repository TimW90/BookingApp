package nl.itvitae.BookingApp.room;

import java.lang.reflect.Type;
import java.time.LocalDate;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {
  @Query(
      "SELECT r FROM Room r WHERE r.type = :type AND r.id NOT IN ("
          + "SELECT b.room.id FROM Booking b WHERE b.checkIn <= :checkOutDate AND b.checkOut >= :checkInDate)")
  List<Room> findAvailableRoomsByTypeAndDateRange(
      @Param("type") Type type,
      @Param("checkInDate") LocalDate checkInDate,
      @Param("checkOutDate") LocalDate checkOutDate);
}
