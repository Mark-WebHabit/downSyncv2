import { StyleSheet, Text, View } from "react-native";
import React, { createContext, useEffect, useState } from "react";
import { getSavedUser } from "../utilities/preferences";
import { createListener } from "../utilities/CreateListener";
import { getData } from "../utilities/LocalStorage";

export const GamesContext = createContext(null);

const GameContextProvider = ({ children }) => {
  const [fetching, setFetching] = useState(true);
  const [user, setUser] = useState(null);
  const [matching, setMatching] = useState(null);

  useEffect(() => {
    async function getUser() {
      const savedUser = await getSavedUser();
      setUser(savedUser);

      const objectMatching = await getData("objectMatching");

      if (savedUser?.uid) {
        setMatching(objectMatching);

        setFetching(false);
        return () => {};
      }
    }
    getUser();
  }, []);

  return (
    <GamesContext.Provider value={{ fetching, user, matching, setMatching }}>
      {children}
    </GamesContext.Provider>
  );
};

export default GameContextProvider;
