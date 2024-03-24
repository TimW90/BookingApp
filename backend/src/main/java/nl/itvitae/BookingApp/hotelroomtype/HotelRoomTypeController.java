package nl.itvitae.BookingApp.hotelroomtype;


import java.time.LocalDate;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("http://localhost:5173")
@RequestMapping("api/v1/hotel-room-type")
@RequiredArgsConstructor
@Transactional
public class HotelRoomTypeController {

  private final HotelRoomTypeRepository hotelRoomTypeRepository;

  public Page<HotelRoomTypeDTO> getAvailableHotelRoomTypesForHotel(
      Long hotelId,
      LocalDate checkInDate,
      LocalDate checkOutDate,
      @PageableDefault(size = 10, sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {

    Page<HotelRoomType> hotelRoomTypes = hotelRoomTypeRepository.findAll(pageable);
    return hotelRoomTypes.map(HotelRoomTypeDTO::createHotelRoomTypeDTO);
  }
}
