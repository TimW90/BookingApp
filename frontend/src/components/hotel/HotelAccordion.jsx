import { useState } from 'react';
import Accordion from '../common/Accordion';
import AccordionCard from '../common/AccordionCard';
import { useForm } from 'react-hook-form';
import SearchBar from '../searchbar/Searchbar';
import PropTypes from 'prop-types';
import LoadingSpinner from '../common/LoadingSpinner';
import { useHotels } from './HotelContext';

const HotelAccordion = ({ isAdmin }) => {
  const { register, handleSubmit } = useForm();


  const { hotels, loading, updateSearchParams } = useHotels();

  const onSubmit = (searchForm) => {
    updateSearchParams(searchForm);
  };

  const { hotels, hasMore, loading, error } = usePagination(params, pageNumber);

  return (
    <>
      <SearchBar onSubmit={onSubmit}/>
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
