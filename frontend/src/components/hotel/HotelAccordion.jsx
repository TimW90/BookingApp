import Accordion from '../common/Accordion';
import { useHotels } from './HotelContext';
import AccordionCard from '../common/AccordionCard';

const HotelAccordion = ({ isAdmin }) => {
  const { hotels } = useHotels();

  return (
    <Accordion>
      {hotels.map((hotel) => (
        <AccordionCard
          key={hotel.id}
          item={hotel}
          isAdmin={isAdmin}
          length={hotels.length}
          cardType="hotel"
        />
      ))}
    </Accordion>
  );
};

export default HotelAccordion;
