import { useEffect, useState } from "react";
import { getLocations } from "@/api/hotelApi";
import DatePicker from "./DatePicker";
import { useForm } from "react-hook-form";

const SearchBar = () => {

  const [locations, setLocations] = useState([]);

  const { register, handleSubmit} = useForm();

  useEffect(() => {
    const loadLocations = async () => {
      const fetchedLocations = await getLocations();
      setLocations(fetchedLocations);
    };

    loadLocations();
  }, [locations]);

  const onSubmit = (formData) => {
    
  }



return (
 <div className="flex w-full">
  <form onSubmit={handleSubmit(onSubmit)}>
  
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
  <div className="divider divider-horizontal"></div>
  <div className="grid h-15 w-14 flex-grow card bg-base-300 rounded-box place-items-center"><DatePicker></DatePicker></div>
  <div className="divider divider-horizontal"></div>
 
  <div className="divider divider-horizontal"></div>
  <button method="submit" className="btn">Search</button>
  </form>
</div>

)
}

export default SearchBar