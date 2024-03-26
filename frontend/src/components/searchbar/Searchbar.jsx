import { useEffect, useState } from 'react';
import DatePicker from './DatePicker';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import useLocations from '@/hooks/useLocations';
import { useSearchParams } from './SearchParamsContext';
import { enumSimpleName } from '../util/util';
import OccupantsDropdown from './OccupantsDropdown';
import { useHotels } from '../hotel/HotelContext';
import StarRatingInput from '@/form/StarRatingInput';
import Input from '@/form/Input';

const SearchBar = ({ isLocationFixed = false }) => {
  const { searchParams, setSearchParams } = useSearchParams();
  const locations = useLocations();
  const { register, handleSubmit, control } = useForm({
    defaultValues: searchParams,
  });

  const onSubmit = (searchForm) => {
    setSearchParams((prevParams) => ({ ...prevParams, ...searchForm }));
  };

  return (
    <div className="flex w-full">
      <form
        className="flex flex-col sm:flex-row w-full justify-center bg-base-100 gap-4 mx-96 items-center border border-base-content border-opacity-50 rounded-lg my-4 px-4 py-1 z-10 "
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* This part only renders on an hotel landing page */}
        {!isLocationFixed ? (
          <>
            {/* location could be refactored to use <Select/> */}
            <div className="relative">
              <select
                className="select select-bordered bg-primary-content w-full max-w-xs"
                {...register('location')}
                defaultValue=""
              >
                <option value="">Locations</option>
                {locations.map((location) => (
                  <option key={location} value={location}>
                    {enumSimpleName(location)}
                  </option>
                ))}
              </select>
            </div>
            <Input
              register={register}
              type="text"
              name="hotelName"
              aria-label="search hotel by name"
            />

            <StarRatingInput register={register} name="starRating" />
          </>
        ) : (
          <>
            <DatePicker register={register} />
            <OccupantsDropdown control={control} />
          </>
        )}

        <button method="submit" className="btn border border-primary-content">
          Search
        </button>
      </form>
    </div>
  );
};

SearchBar.propTypes = {
  isLocationFixed: PropTypes.bool,
};

export default SearchBar;
