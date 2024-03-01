import Accordion from '../common/Accordion';
import useHotels from '@/hooks/useHotels';
import AccordionItem from '../common/AccordionItem';
import HotelCard from './HotelCard';

const HotelListNew = ({ isAdmin }) => {
  const hotels = useHotels();

  return (
    <Accordion>
      {hotels.map((hotel) => (
        <AccordionItem key={`hotel-accordion-item-${hotel.id}`} item={hotel}>
          <HotelCard hotel={hotel} />
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default HotelListNew;
