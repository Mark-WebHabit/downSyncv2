import React, { createContext, useEffect, useState } from "react";
import { getSavedUser } from "../utilities/preferences";
import { getData } from "../utilities/LocalStorage";

export const AnimalsContext = createContext(null);

const AnimalsContextProvider = ({ children }) => {
  const [fetching, setFetching] = useState(true);
  const [matchingEasy, setMatchingEasy] = useState(null);
  const [matchingMedium, setMatchingMedium] = useState(null);
  const [matchingHard, setMatchingHard] = useState(null);

  useEffect(() => {
    async function getUser() {
      const easyData = await getData("easy");
      const medium = await getData("medium");
      const hard = await getData("hard");

      setMatchingEasy(easyData);
      setMatchingMedium(medium);
      setMatchingHard(hard);

      setFetching(false);
    }
    getUser();
  }, []);

  return (
    <AnimalsContext.Provider
      value={{
        fetching,
        matchingEasy,
        matchingMedium,
        matchingHard,
        setMatchingEasy,
        setMatchingMedium,
        setMatchingHard,
      }}
    >
      {children}
    </AnimalsContext.Provider>
  );
};

export default AnimalsContextProvider;
