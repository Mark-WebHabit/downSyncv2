import React, { createContext, useEffect, useState } from "react";
import { getSavedUser } from "../utilities/preferences";
import { createListener } from "../utilities/CreateListener";
import { getData } from "../utilities/LocalStorage";

export const EmotionContext = createContext(null);

const EmotionContextProvider = ({ children }) => {
  const [fetching, setFetching] = useState(true);
  const [user, setUser] = useState(null);
  const [emotionTypes, setEmotionTypes] = useState(null);
  const [emotionsMatching, setEmotionsMatching] = useState(null);
  useEffect(() => {
    async function getUser() {
      const savedUser = await getSavedUser();
      setUser(savedUser);

      const typeEmotions = await getData("typeEmotions");
      const emotionsMatchingData = await getData("emotionsMatching");

      if (savedUser?.uid) {
        setEmotionTypes(typeEmotions);
        setEmotionsMatching(emotionsMatchingData);

        setFetching(false);
      }
    }
    getUser();
  }, []);

  return (
    <EmotionContext.Provider
      value={{
        fetching,
        user,
        emotionTypes,
        setEmotionTypes,
        emotionsMatching,
        setEmotionsMatching,
      }}
    >
      {children}
    </EmotionContext.Provider>
  );
};

export default EmotionContextProvider;
