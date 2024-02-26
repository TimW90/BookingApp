import { useEffect, useState } from "react";
import axios from 'axios';

const Hero = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async() => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/hotels/randomhotel');
        console.log (response.data);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

return ( data ? 
<div className="hero min-h-50vh bg-base-200">
  <div className="hero-content flex-col lg:flex-row">
    <img src="./src/images/Hotel.jpeg" className="max-w-sm rounded-lg shadow-2xl" />
    <div>
       <h1 className="text-5xl font-bold">{data.name}</h1> 
      <p className="py-6">{data.description}</p>
      <button className="btn btn-primary">Get Started</button>
    </div>
  </div>
</div>
: <p>Loading...</p>);
}

export default Hero;