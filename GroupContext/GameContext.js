import React, { createContext, useEffect, useState } from "react";
import { getData } from "../utilities/LocalStorage";

export const GamesContext = createContext(null);

const GameContextProvider = ({ children }) => {
  const [fetching, setFetching] = useState(true);
  const [user, setUser] = useState(null);
  const [matching, setMatching] = useState(null);
  const [matchingMedium, setMatchingMedium] = useState(null);
  const [matchingHard, setMatchingHard] = useState(null);

  useEffect(() => {
    async function getUser() {
      const objectMatching = await getData("objectMatching");
      const objectMatchingMedium = await getData("objectMatchingMedium");
      const objectMatchingHard = await getData("objectMatchingHard");

      setMatching(objectMatching);
      setMatchingMedium(objectMatchingMedium);
      setMatchingHard(objectMatchingHard);

      setFetching(false);
    }
    getUser();
  }, []);

  return (
    <GamesContext.Provider
      value={{
        fetching,
        user,
        matching,
        setMatching,
        matchingMedium,
        setMatchingMedium,
        matchingHard,
        setMatchingHard,
      }}
    >
      {children}
    </GamesContext.Provider>
  );
};

export default GameContextProvider;
