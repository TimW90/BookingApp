import Accordion from '../common/Accordion';
import { useHotels } from './HotelContext';
import AccordionCard from '../common/AccordionCard';
import { useState } from 'react';
import usePagination from '@/hooks/usePagination';
import { useForm } from 'react-hook-form';

const HotelAccordion = ({ isAdmin }) => {
  const { hotels } = useHotels();
  const [params, setParams] = useState({});
  const [pageNumber, setPageNumber] = useState(1);
  const { register, handleSubmit } = useForm();

  const onSubmit = (searchForm) => {
    setParams(searchForm);
    setPageNumber(0);
  };

  usePagination(params, pageNumber);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          aria-label="search"
          {...register('location')}
        ></input>
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
