import { useEffect, useState } from 'react';
import { getLocations } from '@/api/hotelApi';
import DatePicker from './DatePicker';
import { useForm } from 'react-hook-form';
import { enumSimpleName } from '../util/util';

const SearchBar = () => {
  const [locations, setLocations] = useState([]);

  const { register, handleSubmit } = useForm();

  useEffect(() => {
    const loadLocations = async () => {
      const fetchedLocations = await getLocations();
      setLocations(fetchedLocations);
    };

    loadLocations();
  }, [locations]);

  const onSubmit = (searchForm) => {
    updateSearchParams(searchForm);
  };

  return (
    <div className="flex w-full py-6">
      <form
        className="flex w-full justify-center items-center"
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
              {locations.map((location) => (
                <option key={location}>{enumSimpleName(location)}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="divider divider-horizontal"></div>
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

export default SearchBar;
