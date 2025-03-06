import React, { createContext, useEffect, useState } from "react";
import { getSavedUser } from "../utilities/preferences";
import { createListener } from "../utilities/CreateListener";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getData } from "../utilities/LocalStorage";

export const AnimalsContext = createContext(null);

const AnimalsContextProvider = ({ children }) => {
  const [fetching, setFetching] = useState(true);
  const [user, setUser] = useState(null);
  const [matchingEasy, setMatchingEasy] = useState(null);
  const [matchingMedium, setMatchingMedium] = useState(null);
  const [matchingHard, setMatchingHard] = useState(null);

  useEffect(() => {
    async function getUser() {
      const savedUser = await getSavedUser();
      setUser(savedUser);

      const easyData = await getData("easy");
      const medium = await getData("medium");
      const hard = await getData("hard");

      if (savedUser?.uid) {
        setMatchingEasy(easyData);
        setMatchingMedium(medium);
        setMatchingHard(hard);

        setFetching(false);
      }
    }
    getUser();
  }, []);

  return (
    <AnimalsContext.Provider
      value={{
        fetching,
        user,
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
