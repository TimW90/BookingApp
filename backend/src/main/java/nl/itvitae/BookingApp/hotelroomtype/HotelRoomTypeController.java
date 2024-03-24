package nl.itvitae.BookingApp.hotelroomtype;

import lombok.RequiredArgsConstructor;
import nl.itvitae.BookingApp.room.Room;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@CrossOrigin("http://localhost:5173")
@RequestMapping("api/v1/hotel_room_type")
@RequiredArgsConstructor
@Transactional
public class HotelRoomTypeController {

  private final HotelRoomTypeRepository hotelRoomTypeRepository;

  @GetMapping
  public List<String> getAllTypes() {
    return Arrays.stream(HotelRoomType.Type.values()).map(Enum::toString).toList();
  }
}
