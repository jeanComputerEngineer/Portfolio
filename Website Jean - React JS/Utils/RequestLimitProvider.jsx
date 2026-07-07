import React, { createContext, useContext, useState } from 'react';

const RequestLimitContext = createContext();

export const useRequestLimit = () => useContext(RequestLimitContext);

export const RequestLimitProvider = ({ children }) => {
  const MAX_REQUESTS = 30;
  const [requestCount, setRequestCount] = useState(0);
  const [isRequestBlocked, setIsRequestBlocked] = useState(false);

  const handleRequest = () => {
    if (requestCount >= MAX_REQUESTS) {
      setIsRequestBlocked(true);
      return;
    }

    setRequestCount((prevCount) => prevCount + 1);
  };

  const clearRequestCount = () => {
    setRequestCount(0);
    setIsRequestBlocked(false);
  };

  return (
    <RequestLimitContext.Provider value={{ handleRequest, clearRequestCount, isRequestBlocked }}>
      {children}
    </RequestLimitContext.Provider>
  );
};
