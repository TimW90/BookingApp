import { useEffect, useState } from 'react';
import DatePicker from './DatePicker';
import { useForm } from 'react-hook-form';
import Counter from './Counter';
import PropTypes from 'prop-types';
import useLocations from '@/hooks/useLocations';
import { useSearchParams } from './SearchParamsContext';
import { enumSimpleName } from '../util/util';
import { FaRegistered } from 'react-icons/fa6';

const SearchBar = ({ isLocationFixed = false }) => {
  const { searchParams, setSearchParams } = useSearchParams();
  const { register, handleSubmit } = useForm({ defaultValues: searchParams });
  const locations = useLocations();

  const onSubmit = (searchForm) => {
    setSearchParams((prevParams) => ({ ...prevParams, ...searchForm }));
  };

  return (
    <div className="flex w-full">
      <form
        className="flex w-full justify-center items-center gap-10 border rounded-lg  mx-40 z-10 border-base-content"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="dropdown">
          <div className="form-control">
            <select
              className="select select-bordered"
              {...register('location')}
              defaultValue=""
            >
              <option disabled value="">
                Location...
              </option>

              {locations.map((value) => (
                <option key={value} value={value}>
                  {enumSimpleName(value)}
                </option>
              ))}
            </select>
          </div>
        </div>

        <DatePicker register={register} />
        <details className="dropdown">
          <summary className="m-1 btn">Occupants</summary>
          <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
            <li>
              <Counter register={register} text="Persons" />
            </li>
            <li>
              <Counter register={register} text="Rooms" />
            </li>
          </ul>
        </details>
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
