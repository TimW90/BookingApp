import { createContext, useContext, useState, useEffect } from 'react';

const SearchParamsContext = createContext();

export const SearchParamsProvider = ({ children }) => {
  const [searchParams, setSearchParams] = useState({});

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
