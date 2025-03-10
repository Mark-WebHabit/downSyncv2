import React, { createContext, useEffect, useState } from "react";
import { getData } from "../utilities/LocalStorage";

export const EmotionContext = createContext(null);

const EmotionContextProvider = ({ children }) => {
  const [emotionTypes, setEmotionTypes] = useState(null);
  const [fetching, setFetching] = useState(false);
  const [emotionsMatching, setEmotionsMatching] = useState(true);

  useEffect(() => {
    async function getUser() {
      const typeEmotions = await getData("typeEmotions");
      const emotionsMatchingData = await getData("emotionsMatching");

      setEmotionTypes(typeEmotions);
      setEmotionsMatching(emotionsMatchingData);
      setFetching(false);
    }
    getUser();
  }, []);

  return (
    <EmotionContext.Provider
      value={{
        emotionTypes,
        setEmotionTypes,
        emotionsMatching,
        setEmotionsMatching,
        fetching,
      }}
    >
      {children}
    </EmotionContext.Provider>
  );
};

export default EmotionContextProvider;
