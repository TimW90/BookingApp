package nl.itvitae.BookingApp.hotel;

import jakarta.transaction.Transactional;
import java.net.URI;
import java.util.Arrays;
import java.util.List;
import lombok.RequiredArgsConstructor;
import nl.itvitae.BookingApp.exception.ResourceAlreadyExistsException;
import nl.itvitae.BookingApp.exception.ResourceNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

@Transactional
@RestController
@CrossOrigin("http://localhost:5173")
@RequestMapping("api/v1/hotels")
@RequiredArgsConstructor
public class HotelController {

  private final HotelRepository hotelRepository;

  @GetMapping
  public List<HotelDTO> findAll() {
    return hotelRepository.findAll().stream().map(HotelDTO::new).toList();
  }

  @GetMapping("get")
  public Hotel getByQuery(@RequestParam(required = false) Location location) {
    return hotelRepository
        .findByLocation(location)
        .orElseThrow(() -> new ResourceNotFoundException(location.name()));
  }

  @GetMapping("locations")
  public List<String> getAllLocations() {
    return Arrays.stream(Location.values()).map(Enum::name).toList();
  }

  @PostMapping
  public ResponseEntity<?> newHotel(@RequestBody HotelDTO newHotelDTO, UriComponentsBuilder ucb) {
    if (hotelRepository.findByName(newHotelDTO.name()).isPresent()) {
      throw new ResourceAlreadyExistsException(newHotelDTO.name());
    }

    Hotel newHotel =
        hotelRepository.save(
            new Hotel(
                newHotelDTO.name(),
                newHotelDTO.rating(),
                newHotelDTO.location(),
                newHotelDTO.description(),
                newHotelDTO.base64Image()));

    URI locationOfNewHotel =
        ucb.path("api/v1/hotels/{id}").buildAndExpand(newHotel.getId()).toUri();

    return ResponseEntity.created(locationOfNewHotel).body(newHotelDTO);
  }

  @PutMapping("{id}")
  public ResponseEntity<?> updateHotel(
      @PathVariable long id, @RequestBody HotelDTO updatedHotelDTO) {

    Hotel hotelToUpdate =
        hotelRepository
            .findById(id)
            .orElseThrow(
                () -> new ResourceNotFoundException(String.format("Hotel with id %s", id)));

    hotelToUpdate.updateHotelProperties(updatedHotelDTO);
    hotelRepository.save(hotelToUpdate);

    return ResponseEntity.ok().body(new HotelDTO(hotelToUpdate));
  }

  @DeleteMapping("{id}")
  public ResponseEntity<?> deleteHotel(@PathVariable long id) {
    if (hotelRepository.existsById(id)) {
      hotelRepository.deleteById(id);
      return ResponseEntity.noContent().build();
    }

    return ResponseEntity.notFound().build();
  }
}
