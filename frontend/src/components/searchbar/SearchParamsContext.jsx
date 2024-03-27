import { createContext, useContext, useState, useEffect } from 'react';

const SearchParamsContext = createContext();

export const SearchParamsProvider = ({ children }) => {
  const [hotelSearchParams, setHotelSearchParams] = useState({});
  const [roomSearchParams, setRoomSearchParams] = useState({});

  const contextValue = {
    hotelSearchParams,
    setHotelSearchParams,
    roomSearchParams,
    setRoomSearchParams,
  };

  return (
    <SearchParamsContext.Provider value={contextValue}>
      {children}
    </SearchParamsContext.Provider>
  );
};

export const useSearchParams = () => useContext(SearchParamsContext);
