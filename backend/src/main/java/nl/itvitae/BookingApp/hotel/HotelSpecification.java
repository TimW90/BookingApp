package nl.itvitae.BookingApp.hotel;

import org.springframework.data.jpa.domain.Specification;

public class HotelSpecification {

  public static Specification<Hotel> isInLocation(Location location) {
    return (root, query, criteriaBuilder) ->
        location == null
            ? criteriaBuilder.conjunction()
            : criteriaBuilder.equal(root.get("location"), location);
  }

  public static Specification<Hotel> nameLike(String nameLike) {
    return (root, query, criteriaBuilder) ->
        nameLike == null
            ? criteriaBuilder.conjunction()
            : criteriaBuilder.like(
                criteriaBuilder.lower(root.get("name")), "%" + nameLike.toLowerCase() + "%");
  }

  public static Specification<Hotel> starRatingIsHigherThanOrEqualTo(int starRating) {
    return (root, query, criteriaBuilder) ->
        criteriaBuilder.greaterThanOrEqualTo(root.get("starRating"), starRating);
  }
}
