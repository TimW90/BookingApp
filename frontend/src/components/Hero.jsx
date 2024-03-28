import { useEffect, useState } from 'react';
import axios from 'axios';
import defaultImage from '@/images/hotel_placeholder.png';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'http://localhost:8080/api/v1/hotels/randomhotel'
        );
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  if (!data) return <p>Loading...</p>;

  return (
    <div className="hero min-h-50vh bg-base-200 rounded-b-lg">
      <div className="hero-content flex-col lg:flex-row">
        <img
          src={data.base64Image ? data.base64Image : defaultImage}
          className="max-w-sm rounded-lg shadow-2xl"
          alt="hero image"
        />
        <div>
          <h1 className="text-5xl font-bold">{data.name}</h1>
          <p className="py-6">{data.description}</p>
          <Link className="btn btn-secondary" to={`hotel/${data.id}`}>
            Go to hotel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
