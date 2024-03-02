import AccordionItem from './AccordionItem';

const Accordion = ({ items, isAdmin }) => {
  return (
    <div className="join join-vertical w-full px-12">
      {items.map((item) => (
        <AccordionItem isAdmin={isAdmin} key={item.id} item={item} />
      ))}
    </div>
  );
};

export default Accordion;
