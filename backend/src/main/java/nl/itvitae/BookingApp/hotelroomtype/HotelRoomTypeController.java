package nl.itvitae.BookingApp.hotelroomtype;

import static nl.itvitae.BookingApp.hotelroomtype.HotelRoomTypeDTO.createHotelRoomTypeDTO;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import lombok.RequiredArgsConstructor;
import nl.itvitae.BookingApp.exception.ResourceNotFoundException;
import nl.itvitae.BookingApp.hotel.HotelRepository;
import nl.itvitae.BookingApp.image.Image;
import nl.itvitae.BookingApp.image.ImageRepository;
import nl.itvitae.BookingApp.room.Room;
import nl.itvitae.BookingApp.room.RoomRepository;
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
  private final HotelRepository hotelRepository;
  private final ImageRepository imageRepository;
  private final RoomRepository roomRepository;

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
            hotelRoomTypeRepository
                .findAvailableRoomsForHotelRoomType(hotelRoomType, checkInDate, checkOutDate)
                .size();

        hotelRoomTypeAvailabilityDTOS.add(
            new HotelRoomTypeAvailabilityDTO(
                createHotelRoomTypeDTO(hotelRoomType), amountOfAvailableRooms));
      }
    }

    return ResponseEntity.ok(hotelRoomTypeAvailabilityDTOS);
  }

  @PostMapping
  public HotelRoomTypeDTO newHotelRoomType(@RequestBody HotelRoomTypeDTO hotelRoomTypeDTO) {
    var hotel =
        hotelRepository
            .findById(hotelRoomTypeDTO.hotelId())
            .orElseThrow(() -> new ResourceNotFoundException("Hotel not found"));

    HotelRoomType newHotelRoomType =
        new HotelRoomType(
            hotel,
            hotelRoomTypeDTO.type(),
            hotelRoomTypeDTO.name(),
            hotelRoomTypeDTO.price(),
            hotelRoomTypeDTO.description());

    List<Image> newImages =
        imageRepository.saveAll(hotelRoomTypeDTO.base64Images().stream().map(Image::new).toList());

    for (Image image : newImages) {
      image.setHotelRoomType(newHotelRoomType);
    }

    newHotelRoomType.setBase64Images(newImages);
    hotelRoomTypeRepository.save(newHotelRoomType);

    for (int i = 0; i < hotelRoomTypeDTO.quantity(); i++) {
      Room newRoom = new Room(newHotelRoomType);

      roomRepository.save(newRoom);
      newHotelRoomType.getRooms().add(newRoom);
    }
    return HotelRoomTypeDTO.createHotelRoomTypeDTO(newHotelRoomType);
  }

  @GetMapping()
  public List<String> getAllTypes() {
    System.out.println("Getting enum RoomTypes...");
    return Arrays.stream(RoomType.values()).map(Enum::name).toList();
  }

  public record HotelRoomTypeAvailabilityDTO(
      HotelRoomTypeDTO hotelRoomTypeDTO, Integer availableRoomsCount) {}
}
