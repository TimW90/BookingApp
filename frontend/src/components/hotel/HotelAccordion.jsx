import { useState } from 'react';
import Accordion from '../common/Accordion';
import AccordionCard from '../common/AccordionCard';
import usePagination from '@/hooks/usePagination';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import LoadingSpinner from '../common/LoadingSpinner';

const HotelAccordion = ({ isAdmin }) => {
  const [params, setParams] = useState({});
  const { register, handleSubmit } = useForm();

  const { hotels, loading } = usePagination(params);

  const onSubmit = (searchForm) => {
    setParams(searchForm);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" aria-label="search" {...register('name')}></input>
        <button method="submit">Submit</button>
      </form>

      <Accordion>
        {hotels.map((hotel, index) => (
          <AccordionCard
            key={hotel.id}
            item={hotel}
            isAdmin={isAdmin}
            length={hotels.length}
            cardType="hotel"
            index={index}
          />
        ))}
        {loading && <LoadingSpinner />}
      </Accordion>
    </>
  );
};

HotelAccordion.propTypes = {
  isAdmin: PropTypes.bool,
};

export default HotelAccordion;
