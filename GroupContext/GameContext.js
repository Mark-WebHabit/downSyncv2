import { StyleSheet, Text, View } from "react-native";
import React, { createContext, useEffect, useState } from "react";
import { getData } from "../utilities/LocalStorage";

export const GamesContext = createContext(null);

const GameContextProvider = ({ children }) => {
  const [fetching, setFetching] = useState(true);
  const [user, setUser] = useState(null);
  const [matching, setMatching] = useState(null);
  const [matchingMedium, setMatchingMedium] = useState(null);

  useEffect(() => {
    async function getUser() {
      const objectMatching = await getData("objectMatching");
      const objectMatchingMedium = await getData("objectMatchingMedium");

      setMatching(objectMatching);
      setMatchingMedium(objectMatchingMedium);

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
      }}
    >
      {children}
    </GamesContext.Provider>
  );
};

export default GameContextProvider;
