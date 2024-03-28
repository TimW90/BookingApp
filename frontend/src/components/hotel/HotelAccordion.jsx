import { useState } from 'react';
import Accordion from '../common/Accordion';
import AccordionCard from './HotelCard';
import { useForm } from 'react-hook-form';
import SearchBar from '../searchbar/Searchbar';
import PropTypes from 'prop-types';
import LoadingSpinner from '../common/LoadingSpinner';
import { useHotels } from './HotelContext';

const HotelAccordion = ({ isAdminPage }) => {
  const { hotels, isLoading } = useHotels();

  return (
    <>
      <SearchBar />
      <Accordion>
        {hotels.length === 0 && (
          <div className="flex text-xl w-full justify-center my-10">
            <h1 className="text-5xl">No results...</h1>
          </div>
        )}
        {hotels.map((hotel, index) => (
          <AccordionCard
            key={hotel.id}
            item={hotel}
            isAdminPage={isAdminPage}
            length={hotels.length}
            cardType="hotel"
            index={index}
          />
        ))}
        {isLoading && <LoadingSpinner />}
      </Accordion>
    </>
  );
};

HotelAccordion.propTypes = {
  isAdmin: PropTypes.bool,
};

export default HotelAccordion;
