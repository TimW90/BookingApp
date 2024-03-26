package nl.itvitae.BookingApp.hotelroomtype;

import static nl.itvitae.BookingApp.hotelroomtype.HotelRoomTypeDTO.createHotelRoomTypeDTO;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import nl.itvitae.BookingApp.room.Room;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:5173")
@RequestMapping("api/v1/hotel-room-types")
@RequiredArgsConstructor
@Transactional
public class HotelRoomTypeController {

  private final HotelRoomTypeRepository hotelRoomTypeRepository;

  @GetMapping("/availability")
  public ResponseEntity<List<HotelRoomTypeAvailabilityDTO>> getRoomTypesWithAvailability(
      @RequestParam Long hotelId,
      @RequestParam(required = false) LocalDate checkInDate,
      @RequestParam(required = false) LocalDate checkOutDate) {

    List<HotelRoomType> hotelRoomTypes = hotelRoomTypeRepository.findByHotelId(hotelId);
    List<HotelRoomTypeAvailabilityDTO> hotelRoomTypeAvailabilityDTOS = new ArrayList<>();

    // No dates provided, return all hotel room types without availability count
    if (checkInDate == null || checkOutDate == null) {
      for (HotelRoomType hotelRoomType : hotelRoomTypes) {
        hotelRoomTypeAvailabilityDTOS.add(
            new HotelRoomTypeAvailabilityDTO(createHotelRoomTypeDTO(hotelRoomType), null));
      }
    } else {
      // Dates provided, calculate availability
      for (HotelRoomType hotelRoomType : hotelRoomTypes) {
        Integer amountOfAvailableRooms =
            hotelRoomTypeRepository.findAvailableRoomsForHotelRoomType(
                hotelRoomType, checkInDate, checkOutDate).size();

        hotelRoomTypeAvailabilityDTOS.add(
            new HotelRoomTypeAvailabilityDTO(
                createHotelRoomTypeDTO(hotelRoomType), amountOfAvailableRooms));
      }
    }

    return ResponseEntity.ok(hotelRoomTypeAvailabilityDTOS);
  }

  public record HotelRoomTypeAvailabilityDTO(
      HotelRoomTypeDTO hotelRoomTypeDTO, Integer availableRoomsCount) {}

}
