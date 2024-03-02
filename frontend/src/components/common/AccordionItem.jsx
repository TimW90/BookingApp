import HotelCard from '../hotel/HotelCard';

const AccordionItem = ({ item, isAdmin, length }) => (
  <HotelCard hotel={item} isAdmin={isAdmin} length={length} />
);

export default AccordionItem;
