import { StyleSheet, Text, View } from "react-native";
import React, { createContext, useEffect, useState } from "react";
import { getSavedUser } from "../utilities/preferences";
import { createListener } from "../utilities/CreateListener";

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

      if (savedUser?.uid) {
        const unsubscribeMatchingEasy = createListener(
          `games/matching/easy`,
          savedUser.uid,
          (data) => {
            const result = [];

            const keys = Object.keys(data);
            keys.forEach((key) => {
              const obj = {
                uid: key,
                ...data[key],
              };

              result.push(obj);
            });

            setMatchingEasy(result);
          }
        );

        const unsubscribeMatchingMedium = createListener(
          `games/matching/medium`,
          savedUser.uid,
          (data) => {
            const result = [];

            const keys = Object.keys(data);
            keys.forEach((key) => {
              const obj = {
                uid: key,
                ...data[key],
              };

              result.push(obj);
            });

            setMatchingMedium(result);
          }
        );

        const unsubscribeMatchingHard = createListener(
          `games/matching/hard`,
          savedUser.uid,
          (data) => {
            const result = [];

            const keys = Object.keys(data);
            keys.forEach((key) => {
              const obj = {
                uid: key,
                ...data[key],
              };

              result.push(obj);
            });

            setMatchingHard(result);
          }
        );

        setFetching(false);
        // Add more listeners here as needed
        // const unsubscribeAnother = createListener('another_path', savedUser.uid, (data) => { ... });

        // Cleanup listeners when the component unmounts
        return () => {
          unsubscribeMatchingEasy();
          unsubscribeMatchingMedium();
          unsubscribeMatchingHard();
          // unsubscribeAnother();
        };
      }
    }
    getUser();
  }, []);

  return (
    <AnimalsContext.Provider
      value={{ fetching, user, matchingEasy, matchingMedium, matchingHard }}
    >
      {children}
    </AnimalsContext.Provider>
  );
};

export default AnimalsContextProvider;
