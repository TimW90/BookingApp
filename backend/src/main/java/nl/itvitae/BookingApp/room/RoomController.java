package nl.itvitae.BookingApp.room;

import lombok.RequiredArgsConstructor;
import nl.itvitae.BookingApp.hotel.HotelDTO;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:5173")
@RequestMapping("api/v1/rooms")
@RequiredArgsConstructor
public class RoomController {

    private final RoomRepository roomRepository;

    @GetMapping
    public List<RoomDTO> findAll() {
        return roomRepository.findAll().stream().map(RoomDTO::new).toList();
    }

    @GetMapping("/{id}")
    public Room getRoom(@PathVariable("id") Long id) {
        return roomRepository.findById(id).get();
    }

    @PostMapping
    public Room newRoom(@RequestBody Room room) {
        return roomRepository.save(room);
    }

    @DeleteMapping("/{id}")
    public void deleteRoom(@PathVariable("id") Long id) {
        roomRepository.deleteById(id);
    }

    @PatchMapping("/{id}")
    public Room updateRoom(@PathVariable("id") Long id, @RequestBody Room room) {
        Room updatedRoom = roomRepository.findById(id).get();
        updatedRoom.setType(room.getType());
        updatedRoom.setPrice(room.getPrice());
        updatedRoom.setLuxury(room.isLuxury());
        return roomRepository.save(updatedRoom);
    }
}