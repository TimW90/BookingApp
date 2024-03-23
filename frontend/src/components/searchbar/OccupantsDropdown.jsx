import React from 'react';
import { Controller } from 'react-hook-form';
import Counter from './Counter';

const OccupantsDropdown = ({ control }) => {
  return (
    <details className="dropdown ">
      <summary className="m-1 bg-primary-content btn">Occupants</summary>
      <ul className="flex flex-col gap-4 shadow px-1 py-0.5 text-start dropdown-content z-[1] bg-base-100 rounded-box w-52">
        <li>
          <Controller
            name="amountOfPersons"
            control={control}
            render={({ field }) => (
              <Counter
                text="Persons"
                value={field.value || 1}
                onIncrement={() => field.onChange((field.value || 1) + 1)}
                onDecrement={() => field.onChange(Math.max(field.value - 1, 1))}
              />
            )}
          />
        </li>
        <li>
          <Controller
            name="amountOfRooms"
            control={control}
            render={({ field }) => (
              <Counter
                text="Rooms"
                value={field.value || 1}
                onIncrement={() => field.onChange((field.value || 1) + 1)}
                onDecrement={() => field.onChange(Math.max(field.value - 1, 1))}
              />
            )}
          />
        </li>
      </ul>
    </details>
  );
};

export default OccupantsDropdown;
