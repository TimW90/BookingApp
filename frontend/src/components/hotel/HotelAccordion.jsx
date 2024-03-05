import Accordion from '../common/Accordion';
import HotelCard from './HotelCard';
import { useHotel } from './HotelContext';

const HotelAccordion = ({ isAdmin }) => {
  const { hotels } = useHotel();

  return (
    <Accordion>
      {hotels.map((hotel) => (
        <HotelCard
          key={hotel.id}
          hotel={hotel}
          isAdmin={isAdmin}
          length={length}
        />
      ))}
    </Accordion>
  );
};

export default HotelAccordion;
