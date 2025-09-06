import { createContext, useState } from "react";

export const torneosContext = createContext();

export const TorneosProvider = ({ children }) => {
  const [Torneos, setTorneos] = useState([]);

  return (
    <torneosContext.Provider value={{ Torneos, setTorneos }}>
      {children}
    </torneosContext.Provider>
  );
};
