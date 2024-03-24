import { useState } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';

const Counter = ({ onIncrement, onDecrement, value, text }) => {
  return (
    <div className="flex justify-between items-center mx-4">
      <span>{text}</span>

      <div className="flex items-center">
        <button
          aria-label="Decrease number of counter"
          onClick={onDecrement}
          type="button"
          className="btn btn-xs ml-4 rounded-r-none"
        >
          <FaMinus />
        </button>
        {/* Display the current count */}
        <span className="px-3 py-1 border border-primary-content rounded-btn">
          {value}
        </span>
        <button
          aria-label="Increase number of counter"
          onClick={onIncrement}
          type="button"
          className="btn btn-xs rounded-l-none"
        >
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default Counter;
