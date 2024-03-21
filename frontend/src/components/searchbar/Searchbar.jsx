import { useEffect, useState } from 'react';
import { getLocations } from '@/api/hotelApi';
import DatePicker from './DatePicker';
import { useForm } from 'react-hook-form';
import Counter from './Counter';

const SearchBar = ({ onSubmit }) => {
  const [locations, setLocations] = useState([]);

  const { register, handleSubmit } = useForm();

  useEffect(() => {
    const loadLocations = async () => {
      const fetchedLocations = await getLocations();
      setLocations(fetchedLocations);
    };

    loadLocations();
  }, [locations]);

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
              {locations.map((location) => (
                <option key={location}>{location}</option>
              ))}
            </select>
          </div>
        </div>
        <DatePicker register={register} />
        <details className="dropdown">
          <summary className="m-1 btn">Occupants</summary>
          <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
            <li>
              <Counter text="Adults" />
            </li>
            <li>
              <Counter text="Rooms" />
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

export default SearchBar;
