import { useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';

const Counter = ({ onIncrement, onDecrement, value, text }) => {
  return (
    <div className="flex justify-center items-center join">
      {text}
      <button
        aria-label="Decrease number of counter"
        onClick={onDecrement}
        type="button"
        className="btn btn-xs join-item"
      >
        <FaMinus />
      </button>
      {/* Display the current count */}
      <span className="px-4 py-2 border border-primary-content rounded">
        {value}
      </span>
      <button
        aria-label="Increase number of counter"
        onClick={onIncrement}
        type="button"
        className="btn btn-xs join-item"
      >
        <FaPlus />
      </button>
    </div>
  );
};

export default Counter;
