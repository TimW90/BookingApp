package nl.itvitae.BookingApp.room;

import lombok.RequiredArgsConstructor;
import nl.itvitae.BookingApp.exception.ResourceNotFoundException;
import nl.itvitae.BookingApp.hotel.HotelDTO;
import nl.itvitae.BookingApp.hotel.HotelRepository;
import nl.itvitae.BookingApp.hotel.Location;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
@CrossOrigin("http://localhost:5173")
@RequestMapping("api/v1/rooms")
@RequiredArgsConstructor
public class RoomController {

  private final RoomRepository roomRepository;
  private final HotelRepository hotelRepository;

  @GetMapping
  public List<RoomDTO> findAll() {
    return roomRepository.findAll().stream().map(RoomDTO::new).toList();
  }

  @GetMapping("/{id}")
  public RoomDTO getRoom(@PathVariable("id") Long id) {
    return new RoomDTO(
        roomRepository
            .findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Room not found")));
  }

  @GetMapping("types")
  public List<String> getAllTypes() {
    return Arrays.stream(Room.Type.values()).map(Enum::toString).toList();
  }

  @PostMapping
  public List<RoomDTO> newRoom(@RequestBody RoomDTO room) {
    var hotel = hotelRepository.findById(room.hotelId()).get();
    List<Room> newRooms = new ArrayList<>();
    for (int i = 0; i < room.quantity(); i++) {
      Room newRoom = new Room(room.name(), room.type(), room.price(), room.description());
      roomRepository.save(newRoom);
      hotel.addRoom(newRoom);
      newRooms.add(newRoom);
    }
    hotelRepository.save(hotel);
    return newRooms.stream().map(RoomDTO::new).toList();
  }

  @DeleteMapping("/{id}")
  public void deleteRoom(@PathVariable("id") Long id) {
    roomRepository.deleteById(id);
  }

  @PatchMapping("/{id}")
  public Room updateRoom(@PathVariable("id") Long id, @RequestBody Room room) {
    Room updatedRoom = roomRepository.findById(id).get();
    updatedRoom.setName(room.getName());
    updatedRoom.setType(room.getType());
    updatedRoom.setPrice(room.getPrice());
    updatedRoom.setDescription(room.getDescription());
    return roomRepository.save(updatedRoom);
  }
}
