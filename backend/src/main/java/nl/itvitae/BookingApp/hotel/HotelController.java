package nl.itvitae.BookingApp.hotel;

import static java.util.stream.Collectors.toList;
import static nl.itvitae.BookingApp.hotel.HotelSpecification.*;

import jakarta.transaction.Transactional;
import java.net.URI;
import java.util.Arrays;
import java.util.List;
import lombok.RequiredArgsConstructor;
import nl.itvitae.BookingApp.exception.ResourceAlreadyExistsException;
import nl.itvitae.BookingApp.exception.ResourceNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.web.PageableDefault;
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
  public Page<HotelDTO> findAll(
      @PageableDefault(sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {

    return hotelRepository.findAll(pageable).map(HotelDTO::new);
  }

  @GetMapping("{id}")
  public HotelDTO getById(@PathVariable long id) {
    Hotel fetchedHotel =
        hotelRepository
            .findById(id)
            .orElseThrow(
                () ->
                    new ResourceNotFoundException(String.format("Hotel with id %d not found", id)));

    return new HotelDTO(fetchedHotel);
  }

  @GetMapping("get")
  public Page<HotelDTO> getByQuery(
      @RequestParam(required = false) Location location,
      @RequestParam(required = false) String name,
      @RequestParam(defaultValue = "1") int starRating,
      @PageableDefault(sort = "id", direction = Sort.Direction.DESC) Pageable pageable) {

    Specification<Hotel> specification =
        Specification.where(isInLocation(location))
            .and(nameLike(name))
            .and(starRatingIsHigherThanOrEqualTo(starRating));

    Page<Hotel> hotels = hotelRepository.findAll(specification, pageable);
    return hotels.map(HotelDTO::new);
  }

  @GetMapping("locations")
  public List<String> getAllLocations() {
    return Arrays.stream(Location.values()).map(Enum::toString).toList();
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
                newHotelDTO.starRating(),
                newHotelDTO.location(),
                newHotelDTO.description(),
                newHotelDTO.base64Image()));

    URI locationOfNewHotel =
        ucb.path("api/v1/hotels/{id}").buildAndExpand(newHotel.getId()).toUri();

    return ResponseEntity.created(locationOfNewHotel).body(new HotelDTO(newHotel));
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

  @GetMapping("/randomhotel")
  public HotelDTO getByRandomId() {
    long count = hotelRepository.count();
    int randomID = (int) (Math.random() * count) + 1;
    System.out.println("The id is:" + (randomID));
    return new HotelDTO(hotelRepository.findById((long) randomID).get());
  }
}
