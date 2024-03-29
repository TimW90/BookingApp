import { Controller } from 'react-hook-form';
import Counter from './Counter';

const OccupantsDropdown = ({ control }) => {
  const MAX_ROOM_SIZE = 4;
  return (
    <details className="dropdown ">
      <summary className="m-1 bg-primary-content btn">Occupants</summary>
      <ul className="flex flex-col gap-2 shadow py-2 text-start dropdown-content z-[1] bg-base-100 rounded-box w-52">
        <li>
          <Controller
            name="roomSize"
            control={control}
            render={({ field }) => (
              <Counter
                text="Room size"
                value={field.value || 1}
                onIncrement={() =>
                  field.onChange(
                    Math.min((field.value || 1) + 1, MAX_ROOM_SIZE)
                  )
                }
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
                text="Number of rooms"
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
