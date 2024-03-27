package nl.itvitae.BookingApp.hotelroomtype;

import static nl.itvitae.BookingApp.hotelroomtype.HotelRoomTypeDTO.*;

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
  public ResponseEntity<List<HotelRoomTypeDTO>> getRoomTypesWithAvailability(
      @RequestParam Long hotelId,
      @RequestParam(required = false) LocalDate checkInDate,
      @RequestParam(required = false) LocalDate checkOutDate,
      @RequestParam(required = false) Integer roomSize,
      @RequestParam(required = false) Integer amountOfRooms) {

    List<HotelRoomType> hotelRoomTypes = hotelRoomTypeRepository.findByHotelId(hotelId);
    List<HotelRoomTypeDTO> hotelRoomTypeDTOS = new ArrayList<>();

    for (HotelRoomType hotelRoomType : hotelRoomTypes) {
      if (roomSize != null && hotelRoomType.getType().getCapacity() <= roomSize) continue;

      List<Room> availableRooms =
          hotelRoomTypeRepository.findAvailableRoomsForHotelRoomType(
              hotelRoomType, checkInDate, checkOutDate);

      if (amountOfRooms != null && availableRooms.size() < amountOfRooms) continue;

      hotelRoomTypeDTOS.add(
          hotelRoomTypeDTOwithAmountOfRooms(hotelRoomType, availableRooms.size()));
    }

    return ResponseEntity.ok(hotelRoomTypeDTOS);
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

    for (int i = 0; i < hotelRoomTypeDTO.amountOfRooms(); i++) {
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
}
