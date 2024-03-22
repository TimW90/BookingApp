// SearchParamsContext.js
import { createContext, useContext, useState } from 'react';

const SearchParamsContext = createContext();

export const SearchParamsProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useState({
    location: null,
    persons: null,
    amountOfRooms: null,
    startDate: null,
    endDate: null,
  });

  const contextValue = {
    searchParams,
    setSearchParams,
  };

  return (
    <SearchParamsContext.Provider value={contextValue}>
      {children}
    </SearchParamsContext.Provider>
  );
};

export const useSearchParams = () => useContext(SearchParamsContext);
