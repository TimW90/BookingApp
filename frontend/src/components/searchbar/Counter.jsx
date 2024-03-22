import React, { useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';

const Counter = (props) => {
  const [adults, setAdults] = useState(1); // Starting number of adults

  // Increment the number of adults
  const incrementAdults = () => {
    setAdults((prevAdults) => prevAdults + 1);
  };

  // Decrement the number of adults, ensuring it never goes below 1
  const decrementAdults = () => {
    setAdults((prevAdults) => (prevAdults > 1 ? prevAdults - 1 : 1));
  };

  return (
    <div className="flex justify-center items-center join">
      {props.text}
      <button
        aria-label="Decrease number of adults"
        onClick={decrementAdults}
        type="button"
        className="btn btn-xs rounded-l-full join-item"
      >
        <FaMinus />
      </button>
      <input
        className="input-xs w-12 input input-bordered text-center mx-2 join-item"
        type="text"
        aria-label="Number of adults"
        value={adults}
        readOnly
      />
      <button
        aria-label="Increase number of adults"
        onClick={incrementAdults}
        type="button"
        className="btn btn-xs rounded-r-full join-item"
      >
        <FaPlus />
      </button>
    </div>
  );
};

export default Counter;
