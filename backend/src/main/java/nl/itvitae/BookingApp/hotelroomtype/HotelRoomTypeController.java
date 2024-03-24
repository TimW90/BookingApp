package nl.itvitae.BookingApp.hotelroomtype;

import java.util.List;
import lombok.RequiredArgsConstructor;
import nl.itvitae.BookingApp.hotel.Hotel;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("http://localhost:5173")
@RequestMapping("api/v1/hotel-room-type")
@RequiredArgsConstructor
@Transactional
public class HotelRoomTypeController {

  private final HotelRoomTypeRepository hotelRoomTypeRepository;

  @GetMapping
  public List<HotelRoomType> getAllTypesByHotel(Hotel hotel) {
    return hotelRoomTypeRepository.findByHotel(hotel);
  }
}
