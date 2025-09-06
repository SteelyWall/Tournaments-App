import { createContext, useState } from "react";

export const authContex = createContext();

export const AuthProvider = ({ children }) => {
  const Default = {
    loged: false,
    user: null,
  };
  const [authStatus, setauthStatus] = useState(Default);
  return (
    <authContex.Provider value={{ authStatus, setauthStatus }}>
      {children}
    </authContex.Provider>
  );
};
