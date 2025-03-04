import React, { createContext, useState, useContext } from "react";

// Create a context
const UserContext = createContext();

// Custom hook for accessing user context
export const useUser = () => useContext(UserContext);

// Context provider
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
