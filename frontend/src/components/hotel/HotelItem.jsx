const HotelItem = ({ hotel }) => (
  <div className="collapse bg-base-200">
    <input type="radio" name="my-accordion-1" aria-label="roomelement" />
    <div className="collapse-title text-xl font-medium">{hotel.name}</div>
    <div className="collapse-content">{hotel.description}</div>
  </div>
);

export default HotelItem;
