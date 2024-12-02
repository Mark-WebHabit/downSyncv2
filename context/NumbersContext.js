import { createContext } from "react";
import { usePlayMp3, usePlaySound } from "../customHooks/PlaySound";

export const NumbersContext = createContext(null);

const NumbersContextProvder = ({ children }) => {
  return (
    <NumbersContext.Provider value={{}}>{children}</NumbersContext.Provider>
  );
};

export default NumbersContextProvder;
