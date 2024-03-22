import { useEffect, useState } from 'react';
import DatePicker from './DatePicker';
import { useForm } from 'react-hook-form';
import { enumSimpleName } from '../util/util';
import { useHotels } from '../hotel/HotelContext';
import useLocations from '@/hooks/useLocations';
import PropTypes from 'prop-types';
import { useSearchParams } from './SearchParamsContext';
import Select from '@/form/Select';

const SearchBar = ({ isLocationFixed = false }) => {
  const { searchParams, setSearchParams } = useSearchParams();
  const { register, handleSubmit } = useForm({ defaultValues: searchParams });
  const locations = useLocations();

  const onSubmit = (searchForm) => {
    console.log(searchForm);
    setSearchParams((prevParams) => ({ ...prevParams, ...searchForm }));
  };

  return (
    <div className="flex w-full py-6">
      <form
        className="flex w-full justify-center items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* On the hotel landing page we dont render the location anymore,
         since the hotel is bound to a location already */}
        {!isLocationFixed && (
          <>
            <div className="form-control">
              <select
                className="select select-bordered"
                {...register('location')}
                defaultValue=""
              >
                <option disabled value="">
                  Location...
                </option>

                {locations.map((location) => (
                  <option key={location} value={location}>
                    {enumSimpleName(location)}
                  </option>
                ))}
              </select>
            </div>
            <div className="divider divider-horizontal"></div>
          </>
        )}

        <div className="card rounded-box">
          <DatePicker register={register} />
        </div>
        <div className="divider divider-horizontal"></div>
        <details className="dropdown">
          <summary className="m-1 btn">Occupants</summary>
          <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <a>Item 2</a>
            </li>
          </ul>
        </details>
        <div className="divider divider-horizontal"></div>

        <button method="submit" className="btn">
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
