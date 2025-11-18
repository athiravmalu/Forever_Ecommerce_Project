
import { createContext, useContext, useState, useEffect } from "react";

const SearchContext = createContext();


export const SearchProvider = ({ children }) => {
  const [showSearch, setShowSearch] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);


return (
    <SearchContext.Provider value={{ showSearch, setShowSearch, token, setToken }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => useContext(SearchContext);


