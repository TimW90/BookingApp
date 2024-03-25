package nl.itvitae.BookingApp.room;

import lombok.RequiredArgsConstructor;
import nl.itvitae.BookingApp.hotel.HotelRepository;
import nl.itvitae.BookingApp.hotelroomtype.HotelRoomTypeRepository;
import nl.itvitae.BookingApp.image.ImageRepository;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin("http://localhost:5173")
@RequestMapping("api/v1/rooms")
@RequiredArgsConstructor
@Transactional
public class RoomController {

  private final RoomRepository roomRepository;
  private final HotelRepository hotelRepository;
  private final ImageRepository imageRepository;
  private final HotelRoomTypeRepository hotelRoomTypeRepository;

  //  @GetMapping
  //  public List<RoomDTO> findAll() {
  //    return roomRepository.findAll().stream().map(RoomDTO::new).toList();
  //  }
  //
  //  @GetMapping("/{id}")
  //  public RoomDTO getRoom(@PathVariable("id") Long id) {
  //    return new RoomDTO(
  //        roomRepository
  //            .findById(id)
  //            .orElseThrow(() -> new ResourceNotFoundException("Room not found")));
  //  }
  //
  //    //  @GetMapping("types")
  //    //  public List<String> getAllTypes() {
  //    //    return
  //    //
  //
  // Arrays.stream(Room.nl.itvitae.BookingApp.hotelroomtype.RoomType.values()).map(Enum::toString).toList();
  //    //  }
  //
  //  @PostMapping
  //  public List<RoomDTO> newRoom(@RequestBody RoomDTO roomDTO) {
  //    var hotel =
  //        hotelRepository
  //            .findById(roomDTO.hotelRoomType().getHotel().getId())
  //            .orElseThrow(() -> new ResourceNotFoundException("Hotel to add room to not found"));
  //    List<Room> newRooms = new ArrayList<>();
  //    Set<Image> newImages = roomDTO.hotelRoomType().getImageBase64Strings();
  //    imageRepository.saveAll(newImages);
  //
  //    for (int i = 0; i < roomDTO.quantity(); i++) {
  //      Room newRoom =
  //          new Room(roomDTO.name(), roomDTO.hotelRoomType(), roomDTO.price(),
  // roomDTO.description());
  //      for (Image image : newImages) {
  //        image.setHotelRoomType(newRoom.getHotelRoomType());
  //      }
  //      roomRepository.save(newRoom);
  //      hotel.addRoom(newRoom);
  //      newRooms.add(newRoom);
  //    }
  //
  //    hotelRepository.save(hotel);
  //    return newRooms.stream().map(RoomDTO::new).toList();
  //  }
  //
  //  @DeleteMapping("/{id}")
  //  public void deleteRoom(@PathVariable("id") Long id) {
  //    roomRepository.deleteById(id);
  //  }
  //
  //  @PatchMapping("/{id}")
  //  public Room updateRoom(@PathVariable("id") Long id, @RequestBody Room room) {
  //    Room updatedRoom = roomRepository.findById(id).get();
  //    updatedRoom.setName(room.getName());
  //    updatedRoom.setHotelRoomType(room.getHotelRoomType());
  //    updatedRoom.setPrice(room.getPrice());
  //    updatedRoom.setDescription(room.getDescription());
  //    return roomRepository.save(updatedRoom);
  //  }
}
