import { createContext, useContext, useState, useEffect } from 'react';

const SearchParamsContext = createContext();

export const SearchParamsProvider = ({ children }) => {
  const [hotelSearchParams, setHotelSearchParams] = useState({});
  const [roomSearchParams, setRoomSearchParams] = useState({});
  const [roomsSearched, setRoomsSearched] = useState(false);

  useEffect(() => {
    if (Object.keys(roomSearchParams).length > 0) {
      setRoomsSearched(true);
    }
  }, [roomSearchParams]);

  const contextValue = {
    hotelSearchParams,
    setHotelSearchParams,
    roomSearchParams,
    setRoomSearchParams,
    roomsSearched,
  };

  return (
    <SearchParamsContext.Provider value={contextValue}>
      {children}
    </SearchParamsContext.Provider>
  );
};

export const useSearchParams = () => useContext(SearchParamsContext);
