import Accordion from '../common/Accordion';
import AccordionItem from '../common/AccordionItem';
import { useHotel } from './HotelContext';

const HotelList = ({ isAdmin }) => {
  const { hotels } = useHotel();

  return (
    <Accordion>
      {hotels.map((hotel) => (
        <AccordionItem
          isAdmin={isAdmin}
          key={hotel.id}
          item={hotel}
          length={hotels.length}
        />
      ))}
    </Accordion>
  );
};

export default HotelList;
