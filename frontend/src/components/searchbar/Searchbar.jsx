import { useEffect, useState } from 'react';
import DatePicker from './DatePicker';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import useLocations from '@/hooks/useLocations';
import { useSearchParams } from './SearchParamsContext';
import { enumSimpleName } from '../util/util';
import OccupantsDropdown from './OccupantsDropdown';
import StarRatingInput from '@/form/StarRatingInput';
import Input from '@/form/Input';
import { yupResolver } from '@hookform/resolvers/yup';
import { date, number, object } from 'yup';

const hotelSearchSchema = object().shape({});

const SearchBar = ({ isRoomSearchBar = false }) => {
  const {
    hotelSearchParams,
    setHotelSearchParams,
    roomSearchParams,
    setRoomSearchParams,
    setRoomsSearched,
  } = useSearchParams();
  const locations = useLocations();
  roomSearchParams;
  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: isRoomSearchBar ? roomSearchParams : hotelSearchParams,
  });

  const onSubmit = (searchForm) => {
    if (isRoomSearchBar) {
      'Updating room search params', searchForm;
      setRoomSearchParams((prevParams) => ({ ...prevParams, ...searchForm }));
    } else {
      'Updating hotel search params', searchForm;
      setHotelSearchParams((prevParams) => ({ ...prevParams, ...searchForm }));
    }
  };

  return (
    <div className="flex w-full">
      <form
        className="flex flex-col sm:flex-row w-full justify-center bg-base-100 gap-4 mx-96 items-center border border-base-content border-opacity-50 rounded-lg my-4 px-4 py-1 z-10 "
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* This part only renders on an hotel landing page */}
        {!isRoomSearchBar ? (
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

        <button type="submit" className="btn border border-primary-content">
          Search
        </button>

        <button
          type="button"
          className="btn btn-md btn-circle btn-ghost text-center"
          onClick={() => {
            setRoomSearchParams(() => {});
            setRoomsSearched(false);
            reset();
          }}
        >
          clear
        </button>
      </form>
    </div>
  );
};

SearchBar.propTypes = {
  isRoomSearchBar: PropTypes.bool,
};

export default SearchBar;
