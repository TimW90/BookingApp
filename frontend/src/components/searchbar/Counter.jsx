import React, { useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';

const Counter = ({ text, register }) => {
  const [counter, setCounter] = useState(1); // Starting number of counter

  const incrementCounter = () => {
    setCounter((prevCounter) => prevCounter + 1);
  };

  // Decrement the number of counter, ensCounterit never goes below 1
  const decrementCounter = () => {
    setCounter((prevCounter) => (prevCounter > 1 ? prevCounter - 1 : 1));
  };

  return (
    <div className="flex justify-center items-center join">
      {text}
      <button
        aria-label="Decrease number of counter"
        onClick={decrementCounter}
        type="button"
        className="btn btn-xs rounded-l-full join-item"
      >
        <FaMinus />
      </button>
      <input
        className="input-xs w-12 input input-bordered text-center mx-2 join-item"
        type="text"
        aria-label="Number of counter"
        value={counter}
        readOnly
        {...register(text)}
      />
      <button
        aria-label="Increase number of counter"
        onClick={incrementCounter}
        type="button"
        className="btn btn-xs rounded-r-full join-item"
      >
        <FaPlus />
      </button>
    </div>
  );
};

export default Counter;
