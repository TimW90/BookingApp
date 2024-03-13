import { useState, useRef, useCallback } from 'react';
import Accordion from '../common/Accordion';
import AccordionCard from '../common/AccordionCard';
import usePagination from '@/hooks/usePagination';
import { useForm } from 'react-hook-form';

const HotelAccordion = ({ isAdmin }) => {
  const [params, setParams] = useState({});
  const [pageNumber, setPageNumber] = useState(1);
  const { register, handleSubmit } = useForm();
  const { hotels, hasMore, loading, error } = usePagination(params, pageNumber);

  const observer = useRef();
  const lastHotelElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const onSubmit = (searchForm) => {
    setParams(searchForm);
    setPageNumber(0);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" aria-label="search" {...register('name')}></input>
        <button method="submit">Submit</button>
      </form>

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
