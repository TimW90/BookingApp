import { useState, useRef, useCallback } from 'react';
import Accordion from '../common/Accordion';
import AccordionCard from '../common/AccordionCard';
import usePagination from '@/hooks/usePagination';
import { useForm } from 'react-hook-form';
import SearchBar from '../searchbar/Searchbar';

const HotelAccordion = ({ isAdmin }) => {
  const [params, setParams] = useState({});
  const [pageNumber, setPageNumber] = useState(1);
  const { register, handleSubmit } = useForm();
  


  const onSubmit = (searchForm) => {
    setParams(searchForm);
    setPageNumber(0);
  };

  const { hotels, hasMore, loading, error } = usePagination(params, pageNumber);

  return (
    <> 
      <SearchBar onSubmit={onSubmit}/>
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
    </>
  );
};

export default HotelAccordion;
