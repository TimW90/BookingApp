import HotelCard from '../hotel/HotelCard';

const AccordionItem = ({ item, isAdmin }) => (
  <HotelCard hotel={item} isAdmin={isAdmin} />
);

export default AccordionItem;
